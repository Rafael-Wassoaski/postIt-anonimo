import chai from "chai";
import chaiHttp from "chai-http";
import exp from "constants";
import {
  NO_CONTENT,
  CREATED,
  OK,
  BAD_REQUEST,
  NOT_FOUND,
} from "http-status-codes";
import PostIt from "../interfaces/PostIt";

chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request("http://localhost:8000/api/v1").keepOpen();

async function createDefaultPostIt(): Promise<ChaiHttp.Response> {
  const payLoad = {
    from: "Test from",
    to: "Test to",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",
  };

  return await agent.post("/postIt").send(payLoad);
}

describe("postItAnomimo-1: Criação e leitura de postIts", async () => {
  describe("CREATE", async () => {
    it("Should be able to create a postIt", async () => {
      const postIt = {
        from: "Test from",
        to: "Test to",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",
      };
      const response = await agent.post("/postIt").send(postIt);

      expect(response.status).to.be.eq(OK);
      expect(response.body).to.not.be.null;
      expect(response.body).to.have.all.keys(
        "from",
        "to",
        "text",
        "createdAt",
        "updatedAt"
      );
    });

    it("Should not be able to create a postIt without 'from' field", async () => {
      const postIt = {
        to: "Test to",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",
      };
      const response = await agent.post("/postIt").send(postIt);

      expect(response.status).to.be.eq(BAD_REQUEST);
      expect(response.text).to.be.eq(
        'Não foi possível criar o post: o campo "from" está vazio ou nulo'
      );
    });

    it("Should not be able to create a postIt without 'to' field", async () => {
      const postIt = {
        from: "Test from",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",
      };
      const response = await agent.post("/postIt").send(postIt);

      expect(response.status).to.be.eq(BAD_REQUEST);
      expect(response.text).to.be.eq(
        'Não foi possível criar o post: o campo "to" está vazio ou nulo'
      );
    });

    it("Should not be able to create a postIt without 'text' field", async () => {
      const postIt = {
        from: "Test from",
        to: "Test to",
      };
      const response = await agent.post("/postIt").send(postIt);

      expect(response.status).to.be.eq(BAD_REQUEST);
      expect(response.text).to.be.eq(
        'Não foi possível criar o post: o campo "text" está vazio ou nulo'
      );
    });

    it("Should not be able to create a postIt with more than 125 characters in 'text' field", async () => {
      const postIt = {
        from: "Test from",
        to: "Test to",
        text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
         Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.`,
      };
      const response = await agent.post("/postIt").send(postIt);

      expect(response.status).to.be.eq(BAD_REQUEST);
      expect(response.text).to.be.eq(
        'Não foi possível criar o post: o campo "text" supera o limite de 125 caracteres'
      );
    });
  });

  describe("READ", async () => {
    it("Should be able to read all the postIts", async () => {
      const { body: originalPostIt } = await createDefaultPostIt();
      const { status, body: postIts } = await agent.get(`/postIt/`).send();

      expect(status).to.be.eq(OK);
      expect(postIts).to.be.a("array").and.to.have.lengthOf.at.least(1);
      expect(postIts).to.deep.include(originalPostIt);
    });

    it("Should be able to read one created postIt", async () => {
      const { body: originalPostIt } = await createDefaultPostIt();
      const { status, body: postIt } = await agent
        .get(`/postIt/${originalPostIt.id}`)
        .send();

      expect(status).to.be.eq(OK);
      expect(postIt).to.have.all.keys(
        "from",
        "to",
        "text",
        "createdAt",
        "updatedAt"
      );
      expect(originalPostIt).to.deep.equal(postIt);
    });

    it("Should not be able to read an inexistent postIt", async () => {
      const { status } = await agent.get(`/postIt/123456789`).send();

      expect(status).to.be.eq(NOT_FOUND);
    });
  });
});
