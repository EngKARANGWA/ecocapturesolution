"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFormSchemas = seedFormSchemas;
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Called from index.ts AFTER migration completes
async function seedFormSchemas() {
    const { rows } = await db_1.pool.query('SELECT COUNT(*) FROM form_schemas');
    if (Number(rows[0].count) > 0)
        return;
    const seedFile = path_1.default.join(__dirname, '../../data/form-schemas.json');
    if (!fs_1.default.existsSync(seedFile))
        return;
    const schemas = JSON.parse(fs_1.default.readFileSync(seedFile, 'utf-8'));
    for (const [key, schema] of Object.entries(schemas)) {
        await db_1.pool.query('INSERT INTO form_schemas (key, schema) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [key, JSON.stringify(schema)]);
    }
    console.log('Form schemas seeded');
}
// Public — anyone can read a form schema
router.get('/:key', async (req, res) => {
    const { rows } = await db_1.pool.query('SELECT schema FROM form_schemas WHERE key = $1', [req.params.key]);
    if (!rows.length) {
        res.status(404).json({ error: 'Form not found' });
        return;
    }
    res.json(rows[0].schema);
});
// Protected — only admin can update
router.put('/:key', auth_1.requireAuth, async (req, res) => {
    const { key } = req.params;
    if (!['careers', 'partners'].includes(key)) {
        res.status(400).json({ error: 'Invalid form key' });
        return;
    }
    await db_1.pool.query(`INSERT INTO form_schemas (key, schema, updated_at) VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE SET schema = $2, updated_at = NOW()`, [key, JSON.stringify(req.body)]);
    res.json(req.body);
});
exports.default = router;
