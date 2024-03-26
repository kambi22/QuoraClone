export default function swDev(){
    let swurl = `${process.env.PUBLIC_URL}/sw.js`

  
      navigator.serviceWorker.register(swurl).then(function(registration) {
        console.log('Service worker registration successful:', registration);
      }).catch(function(error) {
        console.error('Service worker registration failed:', error);
      });
   
}
// serviceWorker.js

  