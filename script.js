const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterButton=document.getElementById('twitter');
const newQuoteButton=document.getElementById('new-Quote');
const loader=document.getElementById('loader');
let apiQuotes=[];
//show loading 
function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}
//hide loading
function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;
}
// show new quote
function newQuote(){
  loading();
  //random quote 
const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
//author is blank
if(!quote.author){
  authorText.textContent="Unknown";
}
else{
authorText.textContent=quote.author;
}
//check quote length
if(quote.text.length>120){
  quoteText.classList.add('long-quote');
}
else{
  quoteText.classList.remove('long-quote');
}
//set quote, hide loader
quoteText.textContent=quote.text;
complete();
}
//get  quotes from api 
async function getQuotes(){
  loading();
const apiUrl='https://type.fit/api/quotes';
try{
const response=await fetch(apiUrl);
apiQuotes=await response.json();
newQuote();
}
catch(error){
//catch the error
}
}
// tweet quote
function tweetQuote(){
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl,'_blank');
}
//event listener 
newQuoteButton.addEventListener('click',newQuote);
twitterButton.addEventListener('click',tweetQuote);
//on load
getQuotes();