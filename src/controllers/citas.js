const pool = require("../database");
const flash = require('connect-flash');
const ctrl = {};
ctrl.add = async(req, res) => {
    res.render('citas/add');
};
ctrl.consultarAll =async(req, res) => {
    const citas = await pool.query('SELECT * FROM citas WHERE user_id = ?', [req.user.id]);
    res.render('citas/listCitas', { citas });
};
ctrl.novedad = async(req, res) => {
    const { id } = req.params;
    const citas = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
    res.render('citas/newNovedad', {cita: citas[0]});
};
ctrl.updateNovedad = async(req, res) => {
    const { id } = req.params;
    const { asunto_novedad, novedad} = req.body; 
    const newCita = {
        asunto_novedad, 
        novedad,
    };
    await pool.query('UPDATE citas set ? WHERE id = ?', [newCita, id]);
    req.flash('exito', 'Novedad enviada exitosamente');
    res.redirect('/citasAll');
};
module.exports = ctrl;