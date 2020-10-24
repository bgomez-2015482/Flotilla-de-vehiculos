const express = require('express');
const router = express.Router();

const pool = require('../database')

router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { marca, modelo, año, placa, estado } = req.body
    const newLink = {
        marca,
        modelo,
        año,
        placa,
        estado
    };
    console.log(newLink);
    await pool.query('INSERT INTO Vehiculos set ?', [newLink]);
    req.flash('success', 'Vehiculo guardado correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res) =>{
    const links = await pool.query('SELECT * FROM Vehiculos');
    console.log(links);
    res.render('links/list', ({links}));
});

router.get('/delete/:codigovehiculo', async (req, res) => {
    const { codigovehiculo } = req.params;
    await pool.query('DELETE FROM Vehiculos WHERE codigovehiculo = ?', [codigovehiculo]);
    req.flash('success', 'Vehiculo removido correctamente');
    res.redirect('/links');
});

router.get('/edit/:codigovehiculo', async (req, res) => {
    const { codigovehiculo } = req.params;
    const links = await pool.query('SELECT * FROM Vehiculos WHERE codigovehiculo = ?', [codigovehiculo]);
    console.log(links[0]);
    res.render('links/edit', {vehicle: links[0]});
});

router.post('/edit/:codigovehiculo', async (req, res) => {
    const{ codigovehiculo } = req.params;
    const { marca, modelo, año, placa, estado } = req.body;
    const newLink = {
        marca,
        modelo,
        año,
        placa,
        estado
    };
    console.log(newLink);
    await pool.query('UPDATE Vehiculos set ? WHERE codigovehiculo = ?', [newLink, codigovehiculo])
    req.flash('success', 'Vehiculo actualizado correctamente');
    res.redirect('/links');
});


module.exports = router;
