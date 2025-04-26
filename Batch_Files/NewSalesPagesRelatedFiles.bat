@echo off
:: Change to the root project directory (adjust the path if needed)
cd /d %~dp0

:: Navigate to src directory
cd src

:: Create components and subdirectories if they do not exist
if not exist components mkdir components
if not exist components\Common mkdir components\Common
if not exist components\ProductSections mkdir components\ProductSections

:: Create JS files under components\Common
if not exist components\Common\ButtonGroup.js echo // This is a placeholder JS file. > components\Common\ButtonGroup.js
if not exist components\Common\ProductTile.js echo // This is a placeholder JS file. > components\Common\ProductTile.js
if not exist components\Common\SectionHeader.js echo // This is a placeholder JS file. > components\Common\SectionHeader.js
if not exist components\Common\Tile.js echo // This is a placeholder JS file. > components\Common\Tile.js

:: Create CSS files for components\Common
if not exist styles\ButtonGroup.css echo /* This is a placeholder CSS file for ButtonGroup. */ > styles\ButtonGroup.css
if not exist styles\ProductTile.css echo /* This is a placeholder CSS file for ProductTile. */ > styles\ProductTile.css
if not exist styles\SectionHeader.css echo /* This is a placeholder CSS file for SectionHeader. */ > styles\SectionHeader.css
if not exist styles\Tile.css echo /* This is a placeholder CSS file for Tile. */ > styles\Tile.css

:: Create JS files under components\ProductSections
if not exist components\ProductSections\AccessoriesSection.js echo // This is a placeholder JS file. > components\ProductSections\AccessoriesSection.js
if not exist components\ProductSections\DealsSection.js echo // This is a placeholder JS file. > components\ProductSections\DealsSection.js
if not exist components\ProductSections\EngagementSection.js echo // This is a placeholder JS file. > components\ProductSections\EngagementSection.js
if not exist components\ProductSections\PersonalizedSection.js echo // This is a placeholder JS file. > components\ProductSections\PersonalizedSection.js

:: Create CSS files for components\ProductSections
if not exist styles\AccessoriesSection.css echo /* This is a placeholder CSS file for AccessoriesSection. */ > styles\AccessoriesSection.css
if not exist styles\DealsSection.css echo /* This is a placeholder CSS file for DealsSection. */ > styles\DealsSection.css
if not exist styles\EngagementSection.css echo /* This is a placeholder CSS file for EngagementSection. */ > styles\EngagementSection.css
if not exist styles\PersonalizedSection.css echo /* This is a placeholder CSS file for PersonalizedSection. */ > styles\PersonalizedSection.css

:: Create hooks directory and JS file if they do not exist
if not exist hooks mkdir hooks
if not exist hooks\useFetchProducts.js echo // This is a placeholder hook file. > hooks\useFetchProducts.js

:: Navigate to pages directory
cd pages

:: Create Services_Pages directory if it does not exist
if not exist Services_Pages mkdir Services_Pages

:: Create JS files under pages\Services_Pages
if not exist Services_Pages\CategoryTile.js echo // This is a placeholder JS file. > Services_Pages\CategoryTile.js
if not exist Services_Pages\Learning.js echo // This is a placeholder JS file. > Services_Pages\Learning.js
if not exist Services_Pages\ProductCard.js echo // This is a placeholder JS file. > Services_Pages\ProductCard.js
if not exist Services_Pages\ProductList.js echo // This is a placeholder JS file. > Services_Pages\ProductList.js
if not exist Services_Pages\Repair.js echo // This is a placeholder JS file. > Services_Pages\Repair.js
if not exist Services_Pages\Resale.js echo // This is a placeholder JS file. > Services_Pages\Resale.js
if not exist Services_Pages\Sales.js echo // This is a placeholder JS file. > Services_Pages\Sales.js
if not exist Services_Pages\SalesHeader.js echo // This is a placeholder JS file. > Services_Pages\SalesHeader.js
if not exist Services_Pages\Training.js echo // This is a placeholder JS file. > Services_Pages\Training.js
if not exist Services_Pages\Warranty.js echo // This is a placeholder JS file. > Services_Pages\Warranty.js

:: Navigate to src directory to create styles
cd ..\styles

:: Create CSS files for pages\Services_Pages
if not exist CategoryTile.css echo /* This is a placeholder CSS file for CategoryTile. */ > CategoryTile.css
if not exist Learning.css echo /* This is a placeholder CSS file for Learning. */ > Learning.css
if not exist ProductCard.css echo /* This is a placeholder CSS file for ProductCard. */ > ProductCard.css
if not exist ProductList.css echo /* This is a placeholder CSS file for ProductList. */ > ProductList.css
if not exist Repair.css echo /* This is a placeholder CSS file for Repair. */ > Repair.css
if not exist Resale.css echo /* This is a placeholder CSS file for Resale. */ > Resale.css
if not exist Sales.css echo /* This is a placeholder CSS file for Sales. */ > Sales.css
if not exist SalesHeader.css echo /* This is a placeholder CSS file for SalesHeader. */ > SalesHeader.css
if not exist Training.css echo /* This is a placeholder CSS file for Training. */ > Training.css
if not exist Warranty.css echo /* This is a placeholder CSS file for Warranty. */ > Warranty.css

:: Display a completion message
echo All files and directories have been created successfully.
pause
