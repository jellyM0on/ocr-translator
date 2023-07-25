const Tesseract = require('tesseract.js')
const kuromoji = require('kuromoji')

require('dotenv').config();

async function translateText(text){
  try{
    const response = await fetch(process.env.TRANSLATION_SERVER, {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: 'ja',
        target: 'en',
      }),
      headers: {"Content-Type": "application/json"}
    })
    const translated = await response.json()
    return translated.translatedText; 
  } catch(err){
      console.log(err);
  }
}

//read
async function recognize(screenshot){
  try{
    const {data : {text}} = await Tesseract.recognize(screenshot, 'jpn+eng'); 
    const cleanedText = await cleanText(text); 
    const translatedText = await translateText(cleanedText); 
    return {
      text: cleanedText, 
      translated: translatedText
    }
  } catch(e){
    console.log(e)
  }
}

function tokenize(text){
  return new Promise((resolve, reject) => {
     let tokens = []; 
     kuromoji.builder({dicPath: "./dic"}).build(function(err, tokenizer){
      const path = tokenizer.tokenize(text); 
      path.map((token) => {
      if(token.word_type == 'KNOWN'){
        if(token.word_id == 90940){ //id for character "。"
          tokens.push('.')
        } else {
          tokens.push(token.surface_form); 
        }
      }
    })
    resolve(tokens.join("")); 
  })
  })
}

async function cleanText(text){
  try{
    const cleanedText = await tokenize(text)
    return cleanedText
  } catch (e){
    console.log(e)
  }
}

module.exports = {recognize}