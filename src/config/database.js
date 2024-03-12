const mongoose = require('mongoose');
let User;

const connectDB = async () => {
    try {
        // Solo compila el modelo si no ha sido compilado previamente
        if (!User) {
            User = mongoose.model('User', require('../models/userModel').schema);


        }

        await mongoose.connect('mongodb+srv://julianroman1990:1073159088Jr@clusternodeme.bwwy0jl.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Llamada a la función para inicializar datos
        await initializeData();

        // Realiza las 20 consultas sugeridas
        await queryUsers();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Función para inicializar datos
const initializeData = async () => {
    try {
        await User.deleteMany(); // Elimina todos los documentos existentes en la colección

        const usersData = [
            {
                nombres: 'Juan',
                apellidos: 'Gómez',
                correo: 'juan@gmail.com',
                ciudad: 'Londres',
                país: 'Reino Unido',
                salario: 2500,
                edad: 28,
                altura: 175,
                peso: 160,
            },
            {
                nombres: 'Maria',
                apellidos: 'Rodriguez',
                correo: 'maria@hotmail.com',
                ciudad: 'París',
                país: 'Francia',
                salario: 3000,
                edad: 35,
                altura: 160,
                peso: 120,
            },
            {
                nombres: 'Carlos',
                apellidos: 'López',
                correo: 'carlos@yahoo.com',
                ciudad: 'Madrid',
                país: 'España',
                salario: 3500,
                edad: 22,
                altura: 180,
                peso: 140,
            },
            {
                nombres: 'Ana',
                apellidos: 'Martínez',
                correo: 'ana@gmail.com',
                ciudad: 'Nueva York',
                país: 'Estados Unidos',
                salario: 4000,
                edad: 30,
                altura: 165,
                peso: 130,
            },
            {
                nombres: 'Pablo',
                apellidos: 'Fernández',
                correo: 'pablo@hotmail.com',
                ciudad: 'Sydney',
                país: 'Australia',
                salario: 2800,
                edad: 25,
                altura: 170,
                peso: 150,
            },
            {
                nombres: 'Laura',
                apellidos: 'González',
                correo: 'laura@yahoo.com',
                ciudad: 'Roma',
                país: 'Italia',
                salario: 3200,
                edad: 28,
                altura: 160,
                peso: 130,
            },
            {
                nombres: 'Diego',
                apellidos: 'Díaz',
                correo: 'diego@gmail.com',
                ciudad: 'Bogotá',
                país: 'Colombia',
                salario: 3800,
                edad: 32,
                altura: 175,
                peso: 170,
            },
            {
                nombres: 'Elena',
                apellidos: 'Sánchez',
                correo: 'elena@hotmail.com',
                ciudad: 'Mumbai',
                país: 'India',
                salario: 2600,
                edad: 26,
                altura: 155,
                peso: 120,
            },
            {
                nombres: 'Javier',
                apellidos: 'Ramírez',
                correo: 'javier@yahoo.com',
                ciudad: 'Montreal',
                país: 'Canadá',
                salario: 4200,
                edad: 38,
                altura: 185,
                peso: 160,
            },
            {
                nombres: 'Isabel',
                apellidos: 'Luna',
                correo: 'isabel@gmail.com',
                ciudad: 'Buenos Aires',
                país: 'Argentina',
                salario: 3000,
                edad: 23,
                altura: 162,
                peso: 110,
            },
        ];

        await User.insertMany(usersData);
        console.log('Data initialized successfully');
    } catch (error) {
        console.error('Error initializing data:', error);
        process.exit(1);
    }
};

// Función para realizar las 20 consultas sugeridas
const queryUsers = async () => {
    try {
        // Consulta 1: Obtener todos los usuarios que sean mayores de 18 años.
        const usersOver18 = await User.find({ edad: { $gt: 18 } });
        console.log('Users over 18:', usersOver18);

        /* // Consulta 2: Obtener todos los usuarios que sean de Londres o de París.
        const usersInLondonOrParis = await User.find({ $or: [{ ciudad: 'Londres' }, { ciudad: 'París' }] });
        console.log('Users in London or Paris:', usersInLondonOrParis);

       // Consulta 3: Obtener todos los usuarios cuyo salario sea superior a 3000.
const usersWithSalaryAbove3000 = await User.find({ salario: { $gt: 3000 } });
console.log('Users with salary above 3000:', usersWithSalaryAbove3000);

// Consulta 4: Obtener todos los usuarios que vivan en países que no sean "Estados Unidos".
const usersNotInUSA = await User.find({ país: { $ne: 'Estados Unidos' } });
console.log('Users not in USA:', usersNotInUSA);

// Consulta 5: Obtener todos los usuarios que tengan una altura entre 160 y 180.
const usersWithHeightBetween160And180 = await User.find({ altura: { $gte: 160, $lte: 180 } });
console.log('Users with height between 160 and 180:', usersWithHeightBetween160And180);

// Consulta 6: Obtener todos los usuarios que tengan un peso menor a 150 o mayor a 170.
const usersWithWeightLessThan150OrGreaterThan170 = await User.find({
  $or: [{ peso: { $lt: 150 } }, { peso: { $gt: 170 } }],
});
console.log('Users with weight less than 150 or greater than 170:', usersWithWeightLessThan150OrGreaterThan170);

// Consulta 7: Obtener todos los usuarios cuyo correo termine con "@gmail.com".
const usersWithGmailEmail = await User.find({ correo: { $regex: /@gmail\.com$/ } });
console.log('Users with Gmail email:', usersWithGmailEmail);

// Consulta 8: Obtener todos los usuarios que tengan una edad mayor a 25 y un salario mayor a 3000.
const usersOver25WithSalaryAbove3000 = await User.find({ edad: { $gt: 25 }, salario: { $gt: 3000 } });
console.log('Users over 25 with salary above 3000:', usersOver25WithSalaryAbove3000);

// Consulta 9: Obtener todos los usuarios que vivan en "España" y tengan un salario superior a 3500.
const usersInSpainWithSalaryAbove3500 = await User.find({ país: 'España', salario: { $gt: 3500 } });
console.log('Users in Spain with salary above 3500:', usersInSpainWithSalaryAbove3500);

// Consulta 10: Obtener todos los usuarios que vivan en "Argentina" y tengan una edad menor a 30.
const usersInArgentinaWithAgeBelow30 = await User.find({ país: 'Argentina', edad: { $lt: 30 } });
console.log('Users in Argentina with age below 30:', usersInArgentinaWithAgeBelow30);

// Continúa con las demás consultas...

// Consulta 11: Obtener todos los usuarios que tengan una altura mayor a 170 y un peso menor a 140.
const usersWithHeightAbove170AndWeightBelow140 = await User.find({
  altura: { $gt: 170 },
  peso: { $lt: 140 },
});
console.log('Users with height above 170 and weight below 140:', usersWithHeightAbove170AndWeightBelow140);

// Consulta 12: Obtener todos los usuarios que vivan en "India" o "Australia" y tengan un salario mayor a 2500.
const usersInIndiaOrAustraliaWithSalaryAbove2500 = await User.find({
  $or: [{ país: 'India' }, { país: 'Australia' }],
  salario: { $gt: 2500 },
});
console.log('Users in India or Australia with salary above 2500:', usersInIndiaOrAustraliaWithSalaryAbove2500);

// Consulta 13: Obtener todos los usuarios que tengan un salario exacto de 3200 y vivan en "Italia".
const usersWithSalary3200AndLivingInItaly = await User.find({ salario: 3200, país: 'Italia' });
console.log('Users with salary 3200 and living in Italy:', usersWithSalary3200AndLivingInItaly);

// Consulta 14: Obtener todos los usuarios que tengan una edad igual a 30 o una altura menor a 160.
const usersWithAge30OrHeightBelow160 = await User.find({
  $or: [{ edad: 30 }, { altura: { $lt: 160 } }],
});
console.log('Users with age 30 or height below 160:', usersWithAge30OrHeightBelow160);

// Consulta 15: Obtener todos los usuarios que tengan un correo que contenga "hotmail" y un salario mayor a 2800.
const usersWithHotmailEmailAndSalaryAbove2800 = await User.find({
  correo: { $regex: /hotmail/ },
  salario: { $gt: 2800 },
});
console.log('Users with Hotmail email and salary above 2800:', usersWithHotmailEmailAndSalaryAbove2800);

// Consulta 16: Obtener todos los usuarios que vivan en "Canadá" y tengan una edad mayor a 35.
const usersInCanadaWithAgeAbove35 = await User.find({ país: 'Canadá', edad: { $gt: 35 } });
console.log('Users in Canada with age above 35:', usersInCanadaWithAgeAbove35);

// Consulta 17: Obtener todos los usuarios que tengan una altura menor a 155 o un peso mayor a 160.
const usersWithHeightBelow155OrWeightAbove160 = await User.find({
  $or: [{ altura: { $lt: 155 } }, { peso: { $gt: 160 } }],
});
console.log('Users with height below 155 or weight above 160:', usersWithHeightBelow155OrWeightAbove160);

// Consulta 18: Obtener todos los usuarios que tengan un salario mayor a 4000 y vivan en "Francia".
const usersWithSalaryAbove4000AndLivingInFrance = await User.find({
  salario: { $gt: 4000 },
  país: 'Francia',
});
console.log('Users with salary above 4000 and living in France:', usersWithSalaryAbove4000AndLivingInFrance);

// Consulta 19: Obtener todos los usuarios que tengan un correo que termine con "@yahoo.com" y un peso menor a 130.
const usersWithYahooEmailAndWeightBelow130 = await User.find({
  correo: { $regex: /@yahoo\.com$/ },
  peso: { $lt: 130 },
});
console.log('Users with Yahoo email and weight below 130:', usersWithYahooEmailAndWeightBelow130);

// Consulta 20: Obtener todos los usuarios que tengan un salario menor a 3000 o vivan en "Colombia".
const usersWithSalaryBelow3000OrLivingInColombia = await User.find({
  $or: [{ salario: { $lt: 3000 } }, { país: 'Colombia' }],
});
console.log('Users with salary below 3000 or living in Colombia:', usersWithSalaryBelow3000OrLivingInColombia); */


    } catch (error) {
        console.error('Error querying users:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
