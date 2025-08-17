import crypto from "crypto";

import { db } from ".";
import { 
  alertTable,
  bloodPressureRecordTable, 
  medicationRecordTable, 
  noteTable, 
  userTable,
} from "./schema";

// Dados de exemplo para o sistema de monitoramento de pressão arterial
const users = [
  {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    dateOfBirth: "1945-03-15",
    gender: "F",
    weight: "68.5",
    height: "160.0",
    medicalConditions: "Hipertensão arterial, Diabetes tipo 2",
  },
  {
    name: "João Santos",
    email: "joao.santos@email.com", 
    dateOfBirth: "1950-08-22",
    gender: "M",
    weight: "75.0",
    height: "175.0",
    medicalConditions: "Hipertensão arterial",
  },
];

// Registros de pressão arterial de exemplo (últimos 30 dias)
const generateBloodPressureRecords = (userId: string, days: number = 30) => {
  const records = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Manhã
    records.push({
      userId,
      systolic: Math.floor(Math.random() * 40) + 120, // 120-160
      diastolic: Math.floor(Math.random() * 20) + 80,  // 80-100
      pulse: Math.floor(Math.random() * 20) + 70,      // 70-90
      measurementTime: new Date(date.setHours(8, 0, 0, 0)),
      position: "sitting",
      arm: "left",
      beforeMedication: true,
      notes: i % 5 === 0 ? "Acordei um pouco cansada hoje" : null,
    });
    
    // Noite (não todos os dias)
    if (i % 2 === 0) {
      records.push({
        userId,
        systolic: Math.floor(Math.random() * 30) + 125, // 125-155
        diastolic: Math.floor(Math.random() * 15) + 85,  // 85-100
        pulse: Math.floor(Math.random() * 15) + 75,      // 75-90
        measurementTime: new Date(date.setHours(20, 0, 0, 0)),
        position: "sitting",
        arm: "left",
        beforeMedication: false,
        notes: null,
      });
    }
  }
  
  return records;
};

const generateMedicationRecords = (userId: string, days: number = 30) => {
  const records = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Losartana - manhã
    records.push({
      userId,
      medicationName: "Losartana",
      dosage: "50mg",
      frequency: "1x por dia",
      takenAt: new Date(date.setHours(8, 30, 0, 0)),
      notes: null,
    });
    
    // Hidroclorotiazida - manhã (não todos os dias)
    if (i % 3 !== 0) {
      records.push({
        userId,
        medicationName: "Hidroclorotiazida", 
        dosage: "25mg",
        frequency: "1x por dia",
        takenAt: new Date(date.setHours(8, 35, 0, 0)),
        notes: null,
      });
    }
    
    // Metformina - se tiver diabetes
    if (userId && i % 2 === 0) {
      records.push({
        userId,
        medicationName: "Metformina",
        dosage: "500mg",
        frequency: "2x por dia",
        takenAt: new Date(date.setHours(8, 40, 0, 0)),
        notes: null,
      });
      
      records.push({
        userId,
        medicationName: "Metformina",
        dosage: "500mg", 
        frequency: "2x por dia",
        takenAt: new Date(date.setHours(20, 30, 0, 0)),
        notes: null,
      });
    }
  }
  
  return records;
};

const generateNotes = (userId: string) => {
  const notes = [
    {
      userId,
      title: "Consulta médica",
      content: "Consulta de rotina. Médico orientou continuar com a medicação atual. Pressão controlada.",
      category: "general",
      noteDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 dias atrás
    },
    {
      userId,
      title: "Exercício físico",
      content: "Caminhada de 30 minutos no parque. Me senti bem durante e depois.",
      category: "exercise", 
      noteDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 dias atrás
    },
    {
      userId,
      title: "Alimentação",
      content: "Reduzi o sal na comida conforme orientação médica. Usando mais temperos naturais.",
      category: "diet",
      noteDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 dias atrás
    },
  ];
  
  return notes;
};

async function main() {
  console.log("🌱 Iniciando o seeding do sistema de pressão arterial...");

  try {
    // Limpar dados existentes
    console.log("🧹 Limpando dados existentes...");
    await db.delete(alertTable);
    await db.delete(noteTable);
    await db.delete(medicationRecordTable);
    await db.delete(bloodPressureRecordTable);
    await db.delete(userTable);
    console.log("✅ Dados limpos com sucesso!");

    // Inserir usuários
    console.log("👥 Criando usuários...");
    const userIds = [];
    
    for (const userData of users) {
      const userId = crypto.randomUUID();
      userIds.push(userId);
      
      console.log(`  👤 Criando usuário: ${userData.name}`);
      
      await db.insert(userTable).values({
        id: userId,
        name: userData.name,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
        medicalConditions: userData.medicalConditions,
      });
    }

    // Inserir registros de pressão arterial
    console.log("📊 Criando registros de pressão arterial...");
    for (const userId of userIds) {
      const records = generateBloodPressureRecords(userId, 30);
      console.log(`  💓 Criando ${records.length} registros para usuário ${userId.substring(0, 8)}...`);
      
      for (const record of records) {
        await db.insert(bloodPressureRecordTable).values({
          id: crypto.randomUUID(),
          ...record,
        });
      }
    }

    // Inserir registros de medicação
    console.log("💊 Criando registros de medicação...");
    for (const userId of userIds) {
      const records = generateMedicationRecords(userId, 30);
      console.log(`  💊 Criando ${records.length} registros de medicação para usuário ${userId.substring(0, 8)}...`);
      
      for (const record of records) {
        await db.insert(medicationRecordTable).values({
          id: crypto.randomUUID(),
          ...record,
        });
      }
    }

    // Inserir notas
    console.log("📝 Criando notas...");
    for (const userId of userIds) {
      const notes = generateNotes(userId);
      console.log(`  📝 Criando ${notes.length} notas para usuário ${userId.substring(0, 8)}...`);
      
      for (const note of notes) {
        await db.insert(noteTable).values({
          id: crypto.randomUUID(),
          ...note,
        });
      }
    }

    // Criar alguns alertas de exemplo
    console.log("🚨 Criando alertas de exemplo...");
    const alertsData = [
      {
        userId: userIds[0],
        type: "high_pressure",
        message: "Pressão arterial elevada detectada: 160/95 mmHg",
        severity: "medium",
        isRead: false,
      },
      {
        userId: userIds[0], 
        type: "irregular_pulse",
        message: "Pulso irregular detectado durante medição",
        severity: "low",
        isRead: true,
      },
    ];

    for (const alertData of alertsData) {
      await db.insert(alertTable).values({
        id: crypto.randomUUID(),
        ...alertData,
      });
    }

    console.log("✅ Seeding do sistema de pressão arterial concluído com sucesso!");
    console.log(`📊 Foram criados:`);
    console.log(`  👥 ${users.length} usuários`);
    console.log(`  💓 ~${userIds.length * 45} registros de pressão arterial`);
    console.log(`  💊 ~${userIds.length * 120} registros de medicação`);
    console.log(`  📝 ${userIds.length * 3} notas`);
    console.log(`  🚨 ${alertsData.length} alertas`);
    
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    throw error;
  }
}

main().catch(console.error);
