export function commaFormatter(num, sigdig=3) {
    
  if (typeof num == "number") {
    return Intl.NumberFormat("en-US", {maximumSignificantDigits: sigdig}).format(num);
  } else {
    return num
  }
  
}

export function dollarFormatter(num, sigdig=3) {
  
  if (typeof num == "number") {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: sigdig } ).format(num);
  } else {
    return num
  }

}

export function titleCase(str) {
  if (typeof str == "string") {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  } else {
    return str
  }
}

export function percentFormatter(num) {
  if (typeof num == "number") {
    return parseFloat(num*100).toFixed(0)
  } else {
    return num
  }
}

export function policyCoder(text) {
  if ( text === "1") {
    return `${text} - Standard`
  } else {
    return `${text} - Non-Standard`
  }
}