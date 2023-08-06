export const formatPrice = (number) => {

    //Api is returning price in cent that's why we are converting cent into inr by dividing it by 61
    const newNumber = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 6, style: 'currency', currency: 'INR' }).format((number / 61).toFixed());
    return newNumber;
}

export const getUniqueValues = (data, type) => {
    console.log("Calculated.....")
    let unique = data.map(item => item[type]);

    if (type === "colors") {
        //because colors property is comming as a array in data
        unique = unique.flat();
    }

    return ["all", ...new Set(unique)];
}
