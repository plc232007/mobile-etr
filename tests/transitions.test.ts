import test from "node:test";
import assert from "node:assert/strict";
import { initialData } from "../src/mocks/data";
import {
  followNotice,
  receiveDocument,
  submitRequest,
} from "../src/services/transitions";
const fresh = () => structuredClone(initialData);
test("receber CAR resolve somente o envio, preserva análise e registra documento, movimentação e alerta", () => {
  const before = fresh();
  const after = receiveDocument(before, "car", { name: "car.pdf" });
  assert.equal(before.pending[0].resolved, false);
  assert.equal(after.pending[0].resolved, true);
  assert.equal(after.documents.at(-1)?.status, "Recebido");
  assert.equal(after.processes[0].stage, before.processes[0].stage);
  assert.match(after.processes[0].movements[0].title, /CAR recebido/);
  assert.equal(after.alerts[0].read, false);
  assert.deepEqual(receiveDocument(after, "car", { name: "outro.pdf" }), after);
});
test("envios de requerimentos têm protocolos distintos, limpam rascunho e são consultáveis", () => {
  const draft = {
    step: 5,
    service: "Atualização cadastral",
    propertyId: "sao-jose",
    attachments: [{ name: "arquivo.pdf" }],
    message: "Atualizar dados",
  };
  const first = submitRequest(fresh(), draft);
  const second = submitRequest(first.data, draft);
  assert.notEqual(first.id, second.id);
  assert.notEqual(
    first.data.processes[0].protocol,
    second.data.processes[0].protocol,
  );
  assert.equal(first.data.processes[0].propertyId, "sao-jose");
  assert.equal(first.data.draft, null);
  assert.equal(first.data.documents.at(-1)?.category, "Requerimentos");
  assert.equal(first.data.alerts[0].href, `/processo/${first.id}`);
});
test("requerimento inválido não pode ser enviado", () => {
  assert.throws(() =>
    submitRequest(fresh(), {
      step: 5,
      service: "",
      propertyId: "",
      attachments: [],
      message: "",
    }),
  );
});
test("acompanhar edital gera alerta e permite deixar de acompanhar sem duplicar ao cancelar", () => {
  const followed = followNotice(fresh(), "03-2026");
  assert.equal(followed.notices[0].following, true);
  assert.equal(followed.alerts[0].type, "Edital");
  const unfollowed = followNotice(followed, "03-2026");
  assert.equal(unfollowed.notices[0].following, false);
  assert.equal(unfollowed.alerts.length, followed.alerts.length);
});
