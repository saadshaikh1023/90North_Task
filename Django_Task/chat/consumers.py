import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import Message
from django.utils import timezone
from django.shortcuts import get_object_or_404

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_group_name = None
        if self.user.is_authenticated:
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        if self.room_group_name:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')
        receiver_id = text_data_json.get('receiver_id')

        if not message or not receiver_id:
            return

        try:
            receiver = await database_sync_to_async(self.get_user)(receiver_id)
        except User.DoesNotExist:
            await self.send_error("Invalid receiver ID.")
            return

        # Create a unique room name for the sender and receiver
        self.room_group_name = self.get_room_group_name(self.user.id, receiver.id)

        # Save message to database
        await self.save_message(sender=self.user, receiver=receiver, content=message)

        # Notify both users
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': self.user.id,
                'receiver_id': receiver.id,
                'timestamp': timezone.now().isoformat()
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def save_message(self, sender, receiver, content):
        return Message.objects.create(sender=sender, receiver=receiver, content=content)

    @staticmethod
    def get_room_group_name(user1_id, user2_id):
        # Ensure consistent room name regardless of sender/receiver order
        return f"chat_room_{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"

    @staticmethod
    def get_user(user_id):
        return get_object_or_404(User, id=user_id)

    async def send_error(self, error_message):
        await self.send(text_data=json.dumps({'error': error_message}))
