import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getUserInfos, validateToken } from "@/utils/jwtController";
import { Format } from "@/utils/format";
const db = require("@/backend/config/connection");

async function regexInputs(request: Request) {
  // return anti sql injection
  const acentos = "áéíóúàèìòùãõâêîôûäëïöüçÁÉÍÓÚÀÈÌÒÙÃÕÂÊÎÔÛÄËÏÖÜÇ";

  let { proposal, saleValue, clientType, hadContact, contactType, saleStatus, noSaleReason, sellerParticipated, observation, token } = await request.json();

  if (proposal) {
    proposal = proposal.replace(/[^0-9.,]/g, '');
  }
  if (saleValue) {
    saleValue = saleValue.replace(/[^0-9.,]/g, '');
  }
  if (clientType) {
    clientType = clientType.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (hadContact) {
    hadContact = hadContact.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (contactType) {
    contactType = contactType.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (saleStatus) {
    saleStatus = saleStatus.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (noSaleReason) {
    noSaleReason = noSaleReason.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (sellerParticipated) {
    sellerParticipated = sellerParticipated.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }
  if (observation) {
    observation = observation.replace(new RegExp(`[^a-zA-Z0-9 ${acentos}]`, 'g'), '');
  }

  return { proposal, saleValue, clientType, hadContact, contactType, saleStatus, noSaleReason, sellerParticipated, observation, token };
}


export async function GET(request: Request) {
  const token = request.headers.get('token') as string;
  const proposal = request.headers.get('proposal') as string;

  if (!token || !validateToken(token)) {
    return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  }
  const userInfos = await getUserInfos(token);
  if (userInfos.role === 'usuario') {
    return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const proposalsMysqlAll = await prisma.propostas.findUnique({
      where: {
        COD_PROPOSTA: proposal
      }
    });


    await prisma.$disconnect();
    return NextResponse.json({ result: proposalsMysqlAll }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {

  let { proposal, saleValue, clientType, hadContact, contactType, saleStatus, noSaleReason, sellerParticipated, observation, token } = await regexInputs(request);


  if (!token || !validateToken(token)) {
    return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  }
  const userInfos = await getUserInfos(token);
  if (userInfos.role === 'usuario') {
    return NextResponse.json({ message: 'Não Autorizado!' }, { status: 401 });
  }

  if (!proposal || !clientType || !hadContact || !saleStatus || !sellerParticipated) return NextResponse.json({ message: 'Campos obrigatórios não preenchidos' }, { status: 400 });



  try {
    const connection = await db.connect();

    const proposalQuery = await connection.execute('select * from nbs.vw_gn_propostas_estetica_2 where cod_proposta = :proposal', [proposal]);
    await connection.close();
    let resultProposal = await Format(proposalQuery)[0];

    if (!resultProposal) {
      const clientPostgres = await db.connectPostgres();
      try {
        const queryPostgres = `
         SELECT 
          cod_empresa as COD_EMPRESA,
          empresa as EMPRESA,
          cod_proposta as COD_PROPOSTA,
          cod_cliente as COD_CLIENTE,
          cliente as NOME_CLIENTE,
          produto as PRODUTO,
          modelo as MODELO,
          status_proposta as STATUS_PROPOSTA,
          data_venda as DATA_VENDA,
          emissao as EMISSAO,
          internet as INTERNET,
          canal as CANAL,
          chassi_completo as CHASSI_COMPLETO, 
          vendedor as VENDEDOR 
          from propostas_estetica_vd where cod_proposta = $1
        `;

        const values = [proposal];
        const resultProposalPostgres = await clientPostgres.query(queryPostgres, values);
        if (resultProposalPostgres.rows.length === 0) {
          await clientPostgres.release();
          return NextResponse.json({ message: 'Proposta não encontrada' }, { status: 404 });
        }

        // Formatar o resultPostgres para deixar os chaves em maísculo e remover . e - de cod_cliente
        resultProposalPostgres.rows.forEach((item: any) => {
          for (const key in item) {
            item[key.toUpperCase()] = item[key];
            delete item[key];
          }
        });

        resultProposal = resultProposalPostgres.rows[0];
      } catch (err: any) {
        console.log(err);
        await clientPostgres.release();
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    const prisma = new PrismaClient();

    await prisma.propostas.upsert({
      create: {
        COD_EMPRESA: resultProposal.COD_EMPRESA,
        EMPRESA: resultProposal.EMPRESA,
        COD_CLIENTE: resultProposal.COD_CLIENTE.toString(),
        CANAL: resultProposal.CANAL,
        CHASSI_COMPLETO: resultProposal.CHASSI_COMPLETO,
        INTERNET: resultProposal.INTERNET,
        MODELO: resultProposal.MODELO,
        NOME_CLIENTE: resultProposal.NOME_CLIENTE,
        PRODUTO: resultProposal.PRODUTO,
        STATUS_PROPOSTA: resultProposal.STATUS_PROPOSTA,
        VENDEDOR: resultProposal.VENDEDOR,
        DATA_VENDA: resultProposal.DATA_VENDA,
        EMISSAO: resultProposal.EMISSAO,
        COD_PROPOSTA: proposal,
        VALOR_VENDA: Number(saleValue),
        TIPO_CLIENTE: clientType,
        TEVE_CONTATO: hadContact,
        FORMA_CONTATO: contactType,
        STATUS_VENDA: saleStatus,
        MOTIVO_SEM_VENDA: noSaleReason,
        VENDEDOR_PARTICIPOU: sellerParticipated,
        OBSERVACAO: observation,
        AGENTE: userInfos.user,
        PRIMEIRO_REGISTRO: new Date(),
        ULTIMA_ATUALIZACAO: new Date()
      },
      update: {
        VALOR_VENDA: Number(saleValue),
        TIPO_CLIENTE: clientType,
        TEVE_CONTATO: hadContact,
        FORMA_CONTATO: contactType,
        STATUS_VENDA: saleStatus,
        MOTIVO_SEM_VENDA: noSaleReason,
        VENDEDOR_PARTICIPOU: sellerParticipated,
        OBSERVACAO: observation,
        ULTIMA_ATUALIZACAO: new Date(),
        AGENTE: userInfos.user
      },
      where: {
        COD_PROPOSTA: proposal
      }
    });

    await prisma.$disconnect();
    return NextResponse.json({ message: 'Informações da proposta atualizadas' }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
