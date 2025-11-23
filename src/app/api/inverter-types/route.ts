import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/inverter-types.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'src/data/inverter-types.json');
    
    let data = [];
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContents);
    } catch (error) {
      // Arquivo não existe, criar novo
    }
    
    const newId = data.length > 0 ? Math.max(...data.map((item: any) => item.id)) + 1 : 1;
    const newItem = { id: newId, name: body.name };
    data.push(newItem);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar tipo de inversor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    
    const filePath = path.join(process.cwd(), 'src/data/inverter-types.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContents);
    
    data = data.filter((item: any) => item.id !== id);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover tipo de inversor' }, { status: 500 });
  }
}
