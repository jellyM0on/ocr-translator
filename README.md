<h1>jpOCR</h1>

<p>This project is an Electron app which recognizes and translates Japanese text from a user-selected desktop window. It uses Tesseract.js as its OCR Engine and a local LibreTranslate server for translation. Desktop interactions are dependent on Electron's desktopCapturer module. </p>

<h5>Video Demo:</h5>

<iframe width="420" height="345" src="https://youtube.com/shorts/HSruOH1ZVMo?feature=share">
</iframe>


<p>Note: Low accuracy for graphics heavy sources </p>

<h5>Work in progress:</h5>

<p>— Image cleanup for better OCR processing through adjusting image dimensions and color contrasts to improve accuracy
<br>- Setting up the Electron build</p>

<h5>How to run locally:</h5>

<p>Clone the project
<br>Set up a local LibreTranslate server (free) or a different translation API you may like to use
<br>- python3 main.py --load-only en,ja to run the server 
<br>- Get the server url. Create an .env file with "PORT=serverurl" 
<br>Call npm start for the project. Command + X to translate </p>







