import boto3
import base64

# Initialize S3 client
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Get bucket name and file details from the event
        bucket_name = event.get('bucket_name')
        file_name = event.get('file_name')
        file_content = event.get('file_content')  # Base64 encoded file content

        # Validate input
        if not bucket_name or not file_name or not file_content:
            return {"statusCode": 400, "body": "Missing bucket_name, file_name, or file_content."}

        # Decode the base64 content
        file_data = base64.b64decode(file_content)

        # Upload the file to S3
        s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_data)

        return {
            "statusCode": 200,
            "body": {
                "message": f"File {file_name} uploaded successfully to bucket {bucket_name}."
            }
        }
    except Exception as e:
        return {"statusCode": 500, "body": f"An error occurred: {str(e)}"}


#To test this function we have to invoke the fucntion with below events
#   "bucket_name": "my-s3-bucket",
#   "file_name": "example.pdf",
#   "file_content": "<base64_encoded_file_content>"
    
