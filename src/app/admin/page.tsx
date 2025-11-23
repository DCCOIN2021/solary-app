"use client";

import { useState } from "react";
import { Shield, Users, Settings, Key, CheckCircle2, XCircle, UserPlus, Edit, Trash2, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface SubAdmin {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  permissions: {
    viewReports: boolean;
    manageUsers: boolean;
    editSettings: boolean;
    viewFinancial: boolean;
    manageProjects: boolean;
  };
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      status: "active",
      permissions: {
        viewReports: true,
        manageUsers: true,
        editSettings: false,
        viewFinancial: true,
        manageProjects: true,
      },
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      status: "active",
      permissions: {
        viewReports: true,
        manageUsers: false,
        editSettings: false,
        viewFinancial: false,
        manageProjects: true,
      },
      createdAt: "2024-02-20",
    },
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    permissions: {
      viewReports: false,
      manageUsers: false,
      editSettings: false,
      viewFinancial: false,
      manageProjects: false,
    },
  });

  const [editingAdmin, setEditingAdmin] = useState<SubAdmin | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleLogin = () => {
    if (masterPassword === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const toggleAdminStatus = (id: number) => {
    setSubAdmins(prev =>
      prev.map(admin =>
        admin.id === id
          ? { ...admin, status: admin.status === "active" ? "inactive" : "active" }
          : admin
      )
    );
  };

  const deleteAdmin = (id: number) => {
    if (confirm("Tem certeza que deseja remover este sub-administrador?")) {
      setSubAdmins(prev => prev.filter(admin => admin.id !== id));
    }
  };

  const addNewAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert("Preencha todos os campos!");
      return;
    }

    const admin: SubAdmin = {
      id: Date.now(),
      name: newAdmin.name,
      email: newAdmin.email,
      status: "active",
      permissions: newAdmin.permissions,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSubAdmins(prev => [...prev, admin]);
    setNewAdmin({
      name: "",
      email: "",
      permissions: {
        viewReports: false,
        manageUsers: false,
        editSettings: false,
        viewFinancial: false,
        manageProjects: false,
      },
    });
    setIsAddDialogOpen(false);
  };

  const updateAdmin = () => {
    if (!editingAdmin) return;

    setSubAdmins(prev =>
      prev.map(admin =>
        admin.id === editingAdmin.id ? editingAdmin : admin
      )
    );
    setEditingAdmin(null);
    setIsEditDialogOpen(false);
  };

  const permissionLabels = {
    viewReports: "Visualizar Relatórios",
    manageUsers: "Gerenciar Usuários",
    editSettings: "Editar Configurações",
    viewFinancial: "Visualizar Financeiro",
    manageProjects: "Gerenciar Projetos",
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Administrador Master</CardTitle>
            <CardDescription className="text-base">
              Acesso restrito - Insira a senha master
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Senha Master</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="text-lg p-6"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
            >
              <Key className="w-5 h-5 mr-2" />
              Acessar Painel
            </Button>
            <p className="text-xs text-center text-gray-500">
              Demo: use &quot;admin123&quot; para acessar
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Painel Master
              </h1>
              <p className="text-xs text-gray-600">Administrador Principal</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <Lock className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardDescription>Total de Sub-Admins</CardDescription>
                <CardTitle className="text-4xl text-purple-600">
                  {subAdmins.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {subAdmins.filter(a => a.status === "active").length} ativos
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardDescription>Administradores Ativos</CardDescription>
                <CardTitle className="text-4xl text-green-600">
                  {subAdmins.filter(a => a.status === "active").length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Online e operacionais</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardDescription>Permissões Totais</CardDescription>
                <CardTitle className="text-4xl text-orange-600">
                  {subAdmins.reduce((acc, admin) => 
                    acc + Object.values(admin.permissions).filter(Boolean).length, 0
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Acessos concedidos</p>
              </CardContent>
            </Card>
          </div>

          {/* Sub-Admins Management */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Gerenciar Sub-Administradores
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Adicione, edite ou remova sub-administradores e suas permissões
                  </CardDescription>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Adicionar Sub-Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Sub-Administrador</DialogTitle>
                      <DialogDescription>
                        Preencha os dados e defina as permissões do novo sub-administrador
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-name">Nome Completo</Label>
                        <Input
                          id="new-name"
                          placeholder="Ex: João Silva"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-email">E-mail</Label>
                        <Input
                          id="new-email"
                          type="email"
                          placeholder="Ex: joao@empresa.com"
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>Permissões</Label>
                        {Object.entries(permissionLabels).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`new-${key}`}
                              checked={newAdmin.permissions[key as keyof typeof newAdmin.permissions]}
                              onCheckedChange={(checked) =>
                                setNewAdmin({
                                  ...newAdmin,
                                  permissions: {
                                    ...newAdmin.permissions,
                                    [key]: checked,
                                  },
                                })
                              }
                            />
                            <label
                              htmlFor={`new-${key}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={addNewAdmin}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Criar Sub-Administrador
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subAdmins.map((admin) => (
                  <div
                    key={admin.id}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      admin.status === "active"
                        ? "bg-white border-gray-200"
                        : "bg-gray-50 border-gray-300 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{admin.name}</h3>
                          <Badge
                            variant={admin.status === "active" ? "default" : "secondary"}
                            className={
                              admin.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }
                          >
                            {admin.status === "active" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Ativo
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" />
                                Inativo
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{admin.email}</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(admin.permissions).map(([key, value]) =>
                            value ? (
                              <Badge
                                key={key}
                                variant="outline"
                                className="bg-purple-50 border-purple-200 text-purple-700"
                              >
                                {permissionLabels[key as keyof typeof permissionLabels]}
                              </Badge>
                            ) : null
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Criado em: {new Date(admin.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {admin.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                          <Switch
                            checked={admin.status === "active"}
                            onCheckedChange={() => toggleAdminStatus(admin.id)}
                          />
                        </div>

                        <Dialog
                          open={isEditDialogOpen && editingAdmin?.id === admin.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setEditingAdmin(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              onClick={() => setEditingAdmin(admin)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Sub-Administrador</DialogTitle>
                              <DialogDescription>
                                Modifique os dados e permissões do sub-administrador
                              </DialogDescription>
                            </DialogHeader>
                            {editingAdmin && (
                              <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Nome Completo</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingAdmin.name}
                                    onChange={(e) =>
                                      setEditingAdmin({ ...editingAdmin, name: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">E-mail</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={editingAdmin.email}
                                    onChange={(e) =>
                                      setEditingAdmin({ ...editingAdmin, email: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label>Permissões</Label>
                                  {Object.entries(permissionLabels).map(([key, label]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-${key}`}
                                        checked={
                                          editingAdmin.permissions[
                                            key as keyof typeof editingAdmin.permissions
                                          ]
                                        }
                                        onCheckedChange={(checked) =>
                                          setEditingAdmin({
                                            ...editingAdmin,
                                            permissions: {
                                              ...editingAdmin.permissions,
                                              [key]: checked,
                                            },
                                          })
                                        }
                                      />
                                      <label
                                        htmlFor={`edit-${key}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                      >
                                        {label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                <Button
                                  onClick={updateAdmin}
                                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Salvar Alterações
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => deleteAdmin(admin.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
