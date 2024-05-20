import boto3
import json
from boto3.dynamodb.conditions import Key, Attr, And
import base64

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    s3_client = boto3.client('s3')
    table = dynamodb.Table('music')

    operation = event.get('operation')
    if operation == "query":
        # Extract query parameters from the event object
        title = event.get('title')
        year = event.get('year')
        artist = event.get('artist')
        
        filter_expressions = []

        if artist:
            filter_expressions.append(Attr('artist').contains(artist))
        if title:
            filter_expressions.append(Attr('title').contains(title))
        if year:
            filter_expressions.append(Attr('year').eq(year))
    
        # Combine all filter expressions with 'AND'
        if filter_expressions:
            combined_filter_expression = filter_expressions[0]
            for expression in filter_expressions[1:]:
                combined_filter_expression = And(combined_filter_expression, expression)
    
            # Perform the scan with the combined filter expression
            response = table.scan(
                FilterExpression=combined_filter_expression
            )
        else:
            return {
                'statusCode': 400,
                'body': json.dumps("At least one query parameter (artist, title, or year) must be provided."),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
    
        items = response.get('Items', [])
        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps("No results found. Please adjust your query."),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }

        enhanced_items = []
        for item in items:
            img_key = item.get('img_url').split('/')[-1]  # Assuming URL, taking last part as key
            image_data = s3_client.get_object(Bucket='artist-images-75f6e366-025c-4d3a-a5c9-222b87828520', Key=img_key)
            item['encoded_img_data'] = base64.b64encode(image_data['Body'].read()).decode('utf-8')
            enhanced_items.append(item)

        return {
            'statusCode': 200,
            'body': json.dumps(enhanced_items),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }


    # Get operation: Retrieve all the items from music table
    elif operation == "get_all":
        response = table.scan()
        items = response['Items']
        
        enhanced_items = []
        for item in items:
            img_key = item.get('img_url').split('/')[-1]  # Assuming URL, taking last part as key
            image_data = s3_client.get_object(Bucket='artist-images-75f6e366-025c-4d3a-a5c9-222b87828520', Key=img_key)
            item['encoded_img_data'] = base64.b64encode(image_data['Body'].read()).decode('utf-8')
            enhanced_items.append(item)

        return {
            'statusCode': 200,
            'body': json.dumps(enhanced_items),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }


