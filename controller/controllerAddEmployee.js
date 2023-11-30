const fs = require('fs');
const request = require('request');

const api_key = '9c99a256-5171-11ee-ad03-b253ea03939d';


const model_id1 = 'a2ecc173-e686-4b6d-946c-c4f03b91a4ef'; // Add the first model's ID
const model_id2 = '51ab4370-6b52-403f-8a3b-a00616adbb6e'; // Add the second model's ID
const model_id3 = '335032a2-84c3-4bc1-8702-b18e4761a122'; // Add the third model's ID

const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

const bcrypt = require('bcrypt')

exports.getAddEmployee = (req, res) => {
    res.render('viewAddEmployee', { userData: req.session.userData, purpose: "Applicant" });
}

exports.postAddEmployee = async (req, res) => {

    const { lastname, firstname, middlename, age, sex, dateofbirth, address, contactNumber, Position, SSS, Pagibig, PhilHealth, fileName } = req.body;

    console.log('File Name: ' + fileName)

    if(!fileName){
        const addEmployee = await prisma.applicant_Data.create({ /* TIP for prisma. (declaration)  if schema.prisma model starting word is capitalized it should be lower cased here.*/
            data: {
                lastName: lastname,
                firstName: firstname,
                middleName: middlename,
                age: age,
                sex: sex,
                address: address,
                contactNo: contactNumber,
                birthdate: dateofbirth,
                sssNo: SSS,
                philHealthNo: PhilHealth,
                pagibigNo: Pagibig,
                position: Position,
                status: "Pending",
                fileName: "Manual Record"
            }
        });

    } else {
        const addEmployee = await prisma.applicant_Data.create({ /* TIP for prisma. (declaration)  if schema.prisma model starting word is capitalized it should be lower cased here.*/
            data: {
                lastName: lastname,
                firstName: firstname,
                middleName: middlename,
                age: age,
                sex: sex,
                address: address,
                contactNo: contactNumber,
                birthdate: dateofbirth,
                sssNo: SSS,
                philHealthNo: PhilHealth,
                pagibigNo: Pagibig,
                position: Position,
                status: "Pending",
                fileName: fileName
            }
        });
    }

    

    console.log("lastName: " + lastname + "\n",
        "firstName: " + firstname + "\n",
        "middleName: " + middlename + "\n",
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

    const date = new Date()
    const getYear = date.getFullYear()
    const getMonth = date.getMonth() + 1

    const yearChecker = await prisma.applicantDate_Counter.findUnique({
        where: {
            year: getYear
        }
    });

    if (!yearChecker) {
        const newYear = await prisma.applicantDate_Counter.create({
            data: {
                year: getYear,
                jan: 0,
                feb: 0,
                mar: 0,
                apr: 0,
                may: 0,
                jun: 0,
                jul: 0,
                aug: 0,
                sep: 0,
                oct: 0,
                nov: 0,
                dec: 0,
            }
        })
    }

    if (getMonth == 1) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { jan: { increment: 1 } } })
    } else if (getMonth == 2) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { feb: { increment: 1 } } })
    } else if (getMonth == 3) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { mar: { increment: 1 } } })
    } else if (getMonth == 4) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { apr: { increment: 1 } } })
    } else if (getMonth == 5) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { may: { increment: 1 } } })
    } else if (getMonth == 6) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { jun: { increment: 1 } } })
    } else if (getMonth == 7) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { jul: { increment: 1 } } })
    } else if (getMonth == 8) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { aug: { increment: 1 } } })
    } else if (getMonth == 9) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { sep: { increment: 1 } } })
    } else if (getMonth == 10) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { oct: { increment: 1 } } })
    } else if (getMonth == 11) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { nov: { increment: 1 } } })
    } else if (getMonth == 12) {
        const updateCounter = await prisma.applicantDate_Counter.update({ where: { year: getYear }, data: { dec: { increment: 1 } } })
    }


    res.redirect('/applicants')
}

exports.getAddECTAGEmployee = (req, res) => {
    res.render('viewAddEmployee', { userData: req.session.userData, purpose: "ECTAG" });
}

exports.postAddECTAGEmployee = async (req, res) => {

    const { email, password, name, age, contactNumber, address, gender, role } = req.body;

    const hashword = await bcrypt.hash(password, 10)

    const addECTAGEmployee = await prisma.user_Data.create({
        data: {
            email: email,
            password: hashword,
            name: name,
            age: age,
            contactNo: contactNumber,
            address: address,
            gender: gender,
            role: role,
            status: "ECTAG"
        }
    })

    console.log("ECTAG Employee added successfully.")

    res.redirect('/ectag-employee')
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

    const form_data3 = {
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


    const options3 = {
        url: `https://app.nanonets.com/api/v2/OCR/Model/${model_id3}/LabelFile/?async=false`,
        formData: form_data2,
        headers: {
            Authorization: 'Basic ' + Buffer.from(api_key + ':').toString('base64'),
        },
    };

    // Use Promise.all to send both requests simultaneously
    Promise.all([
        sendRequest(options1),
        sendRequest(options2),
        sendRequest(options3),
    ])
        .then(([result1, result2, result3]) => {
            // Handle the results from both models
            const extractedData1 = extractDataFromModel1(JSON.parse(result1));
            const extractedData2 = extractDataFromModel2(JSON.parse(result2));
            const extractedData3 = extractDataFromModel3(JSON.parse(result3));

            // Combine the data from both models as needed
            const combinedData = {
                ...extractedData1,
                ...extractedData2,
                ...extractedData3,
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
        First_Name: '',
        Last_Name: '',
        Middle_Name: '',
        Position: '',
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
                case 'First_Name':
                    extractedData.First_Name = text;
                    break;
                case 'Last_Name':
                    extractedData.Last_Name = text;
                    break;
                case 'Middle_Name':
                    extractedData.Middle_Name = text;
                    break;
                case 'Position':
                    extractedData.Position = text;
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


function extractDataFromModel3(ocrResult) {
    console.log('Raw OCR Result from Model 3:', ocrResult);
    const extractedData = {
        Pagibig_No: '',
        PhilHealth_No: '',
        SSS_No: '',

    };

    if (ocrResult && Array.isArray(ocrResult.result)) {
        const predictions = ocrResult.result[0].prediction; // Assuming there is only one result in the array
        predictions.forEach((prediction) => {
            const label = prediction.label;
            const text = prediction.ocr_text;

            switch (label) {
                case 'Pagibig_No': // New field from the third model
                    extractedData.Pagibig_No = text;
                    break;
                case 'PhilHealth_No':
                    extractedData.PhilHealth_No = text;
                    break;
                case 'SSS_No':
                    extractedData.SSS_No = text;
                    break;


                default:
                    // Handle other labels from the third model if needed
                    break;
            }
        });
    } else {
        console.error('Invalid OCR result structure');
    }
    console.log('Extracted Data from Model 3:', extractedData);
    return extractedData;
}