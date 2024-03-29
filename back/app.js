const express = require('express');
const path = require('path');
const campaignRoutes = require('./routes/campaign');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, '../front')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/campaigns', campaignRoutes);
app.use('/:id', campaignRoutes);
app.use('/order', campaignRoutes);

app.get('/', (req, res) => {
  // Ajouter les données de la requête
  res.sendFile(path.join(__dirname, '../front/html/index.html'));
})

module.exports = app;
