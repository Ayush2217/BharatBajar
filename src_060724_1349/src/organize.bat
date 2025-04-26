@echo off
REM Set the base path for your project
set BASE_PATH=C:\Users\ag965\Desktop\Main_Project\device-mantra-frontend\src

REM Ensure the directories exist
if not exist "%BASE_PATH%\components\" mkdir "%BASE_PATH%\components"
if not exist "%BASE_PATH%\components\modals\" mkdir "%BASE_PATH%\components\modals"
if not exist "%BASE_PATH%\components\dialogs\" mkdir "%BASE_PATH%\components\dialogs"
if not exist "%BASE_PATH%\components\auth\" mkdir "%BASE_PATH%\components\auth"
if not exist "%BASE_PATH%\pages\" mkdir "%BASE_PATH%\pages"
if not exist "%BASE_PATH%\styles\" mkdir "%BASE_PATH%\styles"
if not exist "%BASE_PATH%\assets\" mkdir "%BASE_PATH%\assets"
if not exist "%BASE_PATH%\services\" mkdir "%BASE_PATH%\services"  
REM Create only if needed

REM Move general components
move "%BASE_PATH%\Header.js" "%BASE_PATH%\components\Header.js"
move "%BASE_PATH%\Footer.js" "%BASE_PATH%\components\Footer.js"
move "%BASE_PATH%\AddressSearchBar.js" "%BASE_PATH%\components\AddressSearchBar.js"

REM Move modal components
move "%BASE_PATH%\RepairModal.js" "%BASE_PATH%\components\modals\RepairModal.js"
move "%BASE_PATH%\RepairDialog.js" "%BASE_PATH%\components\dialogs\RepairDialog.js"

REM Move authentication components
move "%BASE_PATH%\AuthForm.js" "%BASE_PATH%\components\auth\AuthForm.js"
move "%BASE_PATH%\AuthModal.js" "%BASE_PATH%\components\auth\AuthModal.js"

REM Move page components
move "%BASE_PATH%\HomePage.js" "%BASE_PATH%\pages\HomePage.js"

REM Move CSS files to styles directory
move "%BASE_PATH%\*.css" "%BASE_PATH%\styles"

REM Move images to assets directory (Adjust the extensions as needed)
move "%BASE_PATH%\*.png" "%BASE_PATH%\assets"
move "%BASE_PATH%\*.jpg" "%BASE_PATH%\assets"
move "%BASE_PATH%\*.jpeg" "%BASE_PATH%\assets"
move "%BASE_PATH%\*.svg" "%BASE_PATH%\assets"
move "%BASE_PATH%\*.webp" "%BASE_PATH%\assets"

echo Files have been moved to their designated directories.
pause
