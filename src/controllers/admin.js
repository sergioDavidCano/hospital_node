const pool = require("../database");
const flash = require('connect-flash');
const ctrl = {};
ctrl.pacientes =async(req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.render('citas/pacientes', { users });
};
ctrl.admin =async(req, res) => {
    res.render('auth/profileAdmin');
};
ctrl.novedades =async(req, res) => {
    const {id}= req.params;
    const citas = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
    res.render('citas/novedades',{citas});
};
ctrl.asignarVer =async(req, res) => {
    const {id} = req.params;
    res.render('citas/add',{id});
};
ctrl.addCrear =  async(req, res) => {
    const {id}= req.params;
    const {asunto, especialidad, description, fecha} = req.body;
    const newCita = {
        asunto, 
        especialidad, 
        description,
        user_id: id,
        fecha
    }
    await pool.query('INSERT INTO citas set ?', [newCita]);
    req.flash('exito', 'Cita asignada exitosamente');
    res.redirect(`/citasAll/paciente/${id}`);
};
ctrl.citasPaciente =async(req, res) => {
    const {id} = req.params;
    const citas = await pool.query('SELECT * FROM citas WHERE user_id = ?', [id]);
    res.render('citas/pacientesAll',{citas});
};
ctrl.delete =  async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM citas WHERE ID = ?', [id]);
    req.flash('mensaje', 'Cita cancelada exitosamente');
    res.redirect('/pacientes');
};
ctrl.edit = async(req, res) => {
    const { id } = req.params;
    const citas = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
    res.render('citas/edit', {cita: citas[0]});
};
ctrl.update = async(req, res) => {
    const { id } = req.params;
    const { asunto, description, especialidad,fecha} = req.body; 
    const newCita = {
        asunto, 
        especialidad, 
        description,
        fecha
    };
    await pool.query('UPDATE citas set ? WHERE id = ?', [newCita, id]);
    req.flash('exito', 'Cita modificada exitosamente');
    res.redirect('/citasAll');
};
module.exports = ctrl