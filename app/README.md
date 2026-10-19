# بناء ملف APK

## الطريقة الأسهل (بدون تثبيت أي شيء) — GitHub Actions
1. أنشئ مستودعاً جديداً على github.com وارفع كل محتويات هذا المجلد (بما فيها مجلد .github).
2. افتح تبويب Actions ← Build APK ← انتظر دقيقتين إلى ثلاث.
3. نزّل الملف app-debug-apk من قسم Artifacts أسفل صفحة التشغيل، وفك ضغطه ستجد app-debug.apk.

## على جهازك (يتطلب Node 20 و JDK 17 و Android Studio)
    npm install
    npm run build
    npx cap add android
    npx cap sync android
    cd android && ./gradlew assembleDebug
الملف الناتج: android/app/build/outputs/apk/debug/app-debug.apk
