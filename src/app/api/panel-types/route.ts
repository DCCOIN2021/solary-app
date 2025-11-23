import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/panelTypes.json');

function readPanelTypes(): any[] {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writePanelTypes(types: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(types, null, 2));
}

export async function GET() {
  const types = readPanelTypes();
  return NextResponse.json(types);
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  const types = readPanelTypes();
  const newId = types.length > 0 ? Math.max(...types.map(t => t.id)) + 1 : 1;
  types.push({ id: newId, name });
  writePanelTypes(types);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const { id, name } = await request.json();
  const types = readPanelTypes();
  const index = types.findIndex(t => t.id === id);
  if (index !== -1) {
    types[index].name = name;
    writePanelTypes(types);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Type not found' }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const types = readPanelTypes();
  const filtered = types.filter(t => t.id !== id);
  writePanelTypes(filtered);
  return NextResponse.json({ success: true });
}