package com.amazonaws.samples;

import com.amazonaws.auth.AWSCredentialsProviderChain;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
public class UploadImages {

    public static void main(String[] args) throws IOException {
        AmazonS3 s3client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        String bucketName = "artist-images-75f6e366-025c-4d3a-a5c9-222b87828520";

        File jsonFile = new File("src/main/resources/a1.json");
        JsonParser parser = new JsonFactory().createParser(jsonFile);
        JsonNode rootNode = new ObjectMapper().readTree(parser);
        parser.close();
        JsonNode songsNode = rootNode.path("songs");

        for (JsonNode song : songsNode) {
            String artist = song.path("artist").asText();
            String imgUrl = song.path("img_url").asText();

            try {
                URL url = new URL(imgUrl);
                String fileName = url.getFile();
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                Path tempImage = Files.createTempFile(artist.replace(" ", "_"), fileName);

                // Download image
                try (InputStream in = url.openStream()) {
                    Files.copy(in, tempImage, StandardCopyOption.REPLACE_EXISTING);
                }

                // Upload to S3
                s3client.putObject(new PutObjectRequest(bucketName, fileName, tempImage.toFile()));

                // Delete the downloaded file
                Files.delete(tempImage);

                System.out.println("Uploaded image for artist: " + artist);
            } catch (IOException e) {
                System.err.println("Failed to download or upload image for artist: " + artist);
                e.printStackTrace();
            }

        }
    }
}

