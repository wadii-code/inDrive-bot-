@echo off
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set ANDROID_HOME=C:\Users\Poste\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%
cd /d "C:\Users\Poste\inDrive\DriveBotPro\android"
echo Current dir: %CD%
echo Java:
java -version
echo.
echo Starting Gradle build...
call "C:\Users\Poste\inDrive\DriveBotPro\android\gradlew.bat" app:assembleDebug --no-daemon
echo Exit code: %ERRORLEVEL%
