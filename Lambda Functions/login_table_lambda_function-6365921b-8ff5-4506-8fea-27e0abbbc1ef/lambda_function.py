import boto3
import json
from boto3.dynamodb.conditions import Key
import base64

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('login')
    s3_client = boto3.client('s3')


    operation = event.get('operation')

    # Get operation: Retrieve user details
    if operation == "get":
        email = event.get('email')

        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            # Return the user details
            user = response['Item']
            return {
                'statusCode': 200,
                'body': json.dumps({'email': user['email'], 'user_name': user['user_name'], 'password': user['password']}),
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
            }
        else:
            # User not found
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'User not found'}),
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
            }


    # Register operation: Add new user
    elif operation == "register":
        email = event.get('email')
        user_name = event.get('user_name')
        password = event.get('password')

        
        # make sure the user doesn't already exist
        existing_user_response = table.get_item(Key={'email': email})
        if 'Item' in existing_user_response:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'User already exists'}),
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
            }
        else:
            # Adds a new item to the table
            table.put_item(Item={
                'email': email,
                'user_name': user_name,
                'password': password
            })
            
            # Returns a success message
            return {
                'statusCode': 201,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps({'message': 'User registered successfully'})
            }
            
    elif operation == "subscribe":
        email = event.get('email')
        subscription = event.get('subscription')  # Expecting a dictionary with complete music info

        response = table.get_item(Key={'email': email})
        
        user = response['Item']
        current_subscriptions = user.get('subscriptions', [])

        if subscription in current_subscriptions:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Already subscribed to this music'}),
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
            }

        current_subscriptions.append(subscription)
        table.update_item(
            Key={'email': email},
            UpdateExpression='SET subscriptions = :subs',
            ExpressionAttributeValues={':subs': current_subscriptions},
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Subscription added successfully'}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
        }
    
    elif operation == "unsubscribe":
        email = event.get('email')
        subscription_to_remove = event.get('subscription')

        response = table.get_item(Key={'email': email})

        user = response['Item']
        current_subscriptions = user.get('subscriptions', [])

        new_subscriptions = [sub for sub in current_subscriptions if not (sub['title'] == subscription_to_remove['title'] and sub['artist'] == subscription_to_remove['artist'])]

        table.update_item(
            Key={'email': email},
            UpdateExpression='SET subscriptions = :subs',
            ExpressionAttributeValues={':subs': new_subscriptions},
        )
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Subscription removed successfully'}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
        }
        
    elif operation == "get_subscriptions":
        email = event.get('email')


        response = table.get_item(Key={'email': email})
        
        user = response['Item']
        subscriptions = user.get('subscriptions', [])
        
        enhanced_subscriptions = []
        for sub in subscriptions:
            img_key = sub.get('img_url').split('/')[-1]  # Assuming URL, taking last part as key
            print("Attempting to fetch image with key:", img_key)
            try:
                image_data = s3_client.get_object(Bucket='artist-images-75f6e366-025c-4d3a-a5c9-222b87828520', Key=img_key)
                sub['encoded_img_data'] = base64.b64encode(image_data['Body'].read()).decode('utf-8')
                enhanced_subscriptions.append(sub)
            except Exception as e:
                print(f"Error fetching image: {str(e)}")
                sub['encoded_img_data'] = None
                enhanced_subscriptions.append(sub)

        return {
            'statusCode': 200,
            'body': json.dumps(enhanced_subscriptions),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }

