export default {

    async sendGet(endpoint) {
      let response = await fetch(endpoint, {method: 'GET'});
      let result = await response.json().then(data => {return data}).catch(err => console.log('Error occured while fetching data: ', err));
      return result;
    }        
}