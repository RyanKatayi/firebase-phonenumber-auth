### Initializing Your Expo Project

To begin, create a new Expo project using the blank template with the following command:
```bash
npx create-expo-app firebase-phonenumber-auth --template blank
```
Next, navigate into the project directory:
```bash
cd firebase-phonenumber-auth
```

Remeber to run the set up commands

```bash
npm install
```

And

```bash
npm install --legacy-peer-deps
```

### Prebuilding Your Project

Before proceeding, prebuild your project using the following command:
```bash
npx expo prebuild
```
### Configuring Firebase

After the prebuild process is complete, follow these steps to set up Firebase:

1. Visit the Firebase console and create a new project.
2. Under the Authentication section, enable phone number authentication.
3. Additionally, enable Google authentication.
4. Create an app for both iOS and Android, and note the reverse domain from your `app.json` file.
5. Add the `google-services.json` and `GoogleService-Info.plist` files to your project.

To ensure your project is properly set up, perform the following steps:
```bash
npx expo prebuild
npx expo run:ios
```
To run this project specifically:
1. Fork the repository.
2. Install project dependencies with `npm install`.
3. Prebuild the project with `npx expo prebuild`.
4. Run the project on iOS with `npx expo run:ios`.
