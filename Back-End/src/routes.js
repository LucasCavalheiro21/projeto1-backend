import { Router } from "express";
import { PessoasController } from "./controllers/PessoasController.js";
import { ConhecimentosController } from "./controllers/ConhecimentosController.js";
import { LoginController } from "./controllers/LoginController.js";
import authenticate from "./middlewares/Authenticate.js";
import authorization from "./middlewares/Authorization.js";

const router = Router();
const pessoaController = new PessoasController();
const conhecimentoController = new ConhecimentosController();
const loginController = new LoginController();

// pessoas

router.get("/pessoas", authenticate, pessoaController.listarPessoas);
router.post("/pessoas", authorization, pessoaController.criarPessoas);
router.post("/login", loginController.login);
router.put("/pessoas/:id", authenticate, pessoaController.atualizarPessoas);
router.delete("/pessoas/:id", authenticate, pessoaController.deletarPessoas);

// conhecimentos

router.get("/conhecimentos", authenticate, conhecimentoController.listarConhecimentos);
router.post("/conhecimentos", authorization, conhecimentoController.criarConhecimentos);
router.put("/conhecimentos/:id", authenticate, conhecimentoController.atualizarConhecimentos);
router.delete("/conhecimentos/:id", authenticate, conhecimentoController.deletarConhecimentos);

export default router;