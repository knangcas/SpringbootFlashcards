FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

LABEL authors="Kevin"

ENTRYPOINT ["java", "-jar", "/app.jar"]