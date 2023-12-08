export class Stock{
    constructor(name, ticker, IPOPrice){
        this.name = name; 
        this.ticker = ticker; 
        this.priceHistory = [IPOPrice]; 
    }
}