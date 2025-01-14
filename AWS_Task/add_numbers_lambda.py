def lambda_handler(event, context):
    try:
        # Retrieve numbers from the event object
        num1 = event.get('num1')
        num2 = event.get('num2')
        
        # Validate input
        if num1 is None or num2 is None:
            return {"statusCode": 400, "body": "Please provide both num1 and num2."}
        
        # Calculate the sum
        result = num1 + num2
        
        # Return the result
        return {
            "statusCode": 200,
            "body": {
                "message": "Sum calculated successfully.",
                "result": result
            }
        }
    except Exception as e:
        return {"statusCode": 500, "body": f"An error occurred: {str(e)}"}
