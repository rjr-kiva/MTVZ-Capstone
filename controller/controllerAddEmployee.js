const fs = require('fs');
const request = require('request');

const api_key = '9c99a256-5171-11ee-ad03-b253ea03939d';
const model_id1 = 'a2ecc173-e686-4b6d-946c-c4f03b91a4ef'; // Add the first model's ID
const model_id2 = '51ab4370-6b52-403f-8a3b-a00616adbb6e'; // Add the second model's ID

const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

exports.getAddEmployee = (req, res) => {
    res.render('viewAddEmployee');
}

exports.postAddEmployee = async (req, res) => {

    const { name, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth } = req.body;

    const addEmployee = await prisma.employee_Data.create({ /* TIP for prisma. (declaration)  if schema.prisma model starting word is capitalized it should be lower cased here.*/
        data: {
            name: name,
            age: age,
            sex: sex,
            address: address,
            contactNo: contactNumber,
            birthdate: dateofbirth,
            sssNo: SSS,
            philHealthNo: PhilHealth,
            pagibigNo: Pagibig,
            position: Position
        }
    });

    console.log("name: " + name + "\n", 
                "age: " + age + "\n",
                "sex: " + sex + "\n",
                "dateofbirth: " + dateofbirth + "\n",
                "address: " + address + "\n",
                "contactNumber: " + contactNumber + "\n",
                "Position: " + Position + "\n",
                "SSS: " + SSS + "\n",
                "Pagibig: " + Pagibig + "\n",
                "PhilHealth: " + PhilHealth)

    console.log("Record added successfully.")

    res.render('viewAddEmployee');
}

exports.postUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create separate form data objects for each model
    const form_data1 = {
        file: fs.createReadStream(req.file.path),
    };

    const form_data2 = {
        file: fs.createReadStream(req.file.path),
    };

    // Configure options for the HTTP requests to each model
    const options1 = {
        url: `https://app.nanonets.com/api/v2/OCR/Model/${model_id1}/LabelFile/?async=false`,
        formData: form_data1,
        headers: {
            Authorization: 'Basic ' + Buffer.from(api_key + ':').toString('base64'),
        },
    };

    const options2 = {
        url: `https://app.nanonets.com/api/v2/OCR/Model/${model_id2}/LabelFile/?async=false`,
        formData: form_data2,
        headers: {
            Authorization: 'Basic ' + Buffer.from(api_key + ':').toString('base64'),
        },
    };
    
    // Use Promise.all to send both requests simultaneously
    Promise.all([
        sendRequest(options1),
        sendRequest(options2),
    ])
        .then(([result1, result2]) => {
            // Handle the results from both models
            const extractedData1 = extractDataFromModel1(JSON.parse(result1));
            const extractedData2 = extractDataFromModel2(JSON.parse(result2));

            // Combine the data from both models as needed
            const combinedData = {
                ...extractedData1,
                ...extractedData2,
            };

            res.json(combinedData);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error processing the file' });
        });

        
}

function sendRequest(options) {
    return new Promise((resolve, reject) => {
        request.post(options, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

function extractDataFromModel1(ocrResult) {
    console.log('Raw OCR Result from Model 1:', ocrResult);
    const extractedData = {
        Name: '',
        Address: '',
        Contact_Number: '',
        Date_of_Birth: '',
        Sex: '', // New field from the first model
    };

    if (ocrResult && Array.isArray(ocrResult.result)) {
        const predictions = ocrResult.result[0].prediction; // Assuming there is only one result in the array
        predictions.forEach((prediction) => {
            const label = prediction.label;
            const text = prediction.ocr_text;

            switch (label) {
                case 'Name':
                    extractedData.Name = text;
                    break;
                case 'Address':
                    extractedData.Address = text;
                    break;
                case 'Contact_Number':
                    extractedData.Contact_Number = text;
                    break;
                case 'Date_of_Birth':
                    extractedData.Date_of_Birth = text;
                    break;
                case 'Sex':
                    extractedData.Sex = text;
                    break;
                default:
                    // Handle other labels from the first model if needed
                    break;
            }
        });
    } else {
        console.error('Invalid OCR result structure');
    }
    console.log('Extracted Data from Model 1:', extractedData);
    return extractedData;
}

// fields for second model


function extractDataFromModel2(ocrResult) {
    console.log('Raw OCR Result from Model 2:', ocrResult);
    const extractedData = {
        Age: '',
    };

    if (ocrResult && Array.isArray(ocrResult.result)) {
        const predictions = ocrResult.result[0].prediction; // Assuming there is only one result in the array
        predictions.forEach((prediction) => {
            const label = prediction.label;
            const text = prediction.ocr_text;

            switch (label) {
                case 'Age': // New field from the second model
                    extractedData.Age = text;
                    break;
                default:
                    // Handle other labels from the second model if needed
                    break;
            }
        });
    } else {
        console.error('Invalid OCR result structure');
    }
    console.log('Extracted Data from Model 2:', extractedData);
    return extractedData;
}