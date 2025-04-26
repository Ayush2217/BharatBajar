@echo off
ECHO Creating directories and files for project structure...

mkdir src\components\Modals
echo.> src\components\Modals\RepairModal.js

mkdir src\components\Popups
echo.> src\components\Popups\MobilePopup.js
echo.> src\components\Popups\IssuesPopup.js
echo.> src\components\Popups\TechnicianSlotPopup.js
echo.> src\components\Popups\ConfirmationPopup.js

mkdir src\components\Common
echo.> src\components\Common\Button.js
echo.> src\components\Common\Checkbox.js

mkdir src\hooks
echo.> src\hooks\useModal.js
echo.> src\hooks\useForm.js

mkdir src\services
echo.> src\services\ImageService.js

mkdir src\utils
echo.> src\utils\utilities.js

ECHO Directory and file structure created successfully.
