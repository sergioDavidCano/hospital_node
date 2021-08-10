const {Router} = require('express')
const {  isAuthenticated, vereficacionADMIN_ROLE } =require ('../lib/auth')
const router = Router();
const pool = require('../database');
const citas = require('../controllers/citas');
const auth = require('../controllers/auth');
const home = require('../controllers/index');
const pacientes = require ('../controllers/admin')
router.get('/', home.index);
router.get("/citasAll",isAuthenticated, citas.consultarAll);
router.get('/novedad/:id',isAuthenticated, citas.novedad);
router.post('/novedad/:id',isAuthenticated, citas.updateNovedad);
// userAdmin
router.get('/profileAdmin',vereficacionADMIN_ROLE, isAuthenticated, pacientes.admin);
router.get('/pacientes',vereficacionADMIN_ROLE, pacientes.pacientes);
router.get('/pacientes/asignar/:id',vereficacionADMIN_ROLE, pacientes.asignarVer);
router.post('/citas/add/:id',vereficacionADMIN_ROLE, isAuthenticated, pacientes.addCrear);
router.get("/citasAll/paciente/:id",vereficacionADMIN_ROLE, isAuthenticated, pacientes.citasPaciente);
router.get("/citas/delete/:id",vereficacionADMIN_ROLE, isAuthenticated,pacientes.delete);
router.get("/citas/edit/:id",vereficacionADMIN_ROLE, isAuthenticated, pacientes.edit);
router.post("/citas/edit/:id",vereficacionADMIN_ROLE, isAuthenticated, pacientes.update);
router.get("/novedades/:id",vereficacionADMIN_ROLE,isAuthenticated, pacientes.novedades);
// signup
router.get("/signup", auth.signupRender);
router.post("/signup", auth.signup);
// signin
router.get("/signin", auth.signinRender);
router.post("/signin", auth.signin);
router.get("/logout", auth.logout);
router.get("/profile", isAuthenticated, (req,res)=>{
    res.render('auth/profile');
});
module.exports = router;
