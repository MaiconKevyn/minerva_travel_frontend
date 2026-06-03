
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import { Flower, Airplane, Suitcase } from '@/components/DecorativeElements.jsx';
import { Loader2, BookOpen, Settings, MapPin, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DashboardPage = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const records = await pb.collection('guides').getFullList({
          filter: `userId="${user.id}"`,
          sort: '-created',
          $autoCancel: false
        });
        setGuides(records);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchGuides();
    }
  }, [user?.id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await pb.collection('users').update(user.id, {
        name: editForm.name,
        email: editForm.email
      }, { $autoCancel: false });
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Erro ao atualizar perfil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Meu Painel - Aventuras em Família</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col transition-colors duration-200">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-serif text-primary">
                {user?.name?.charAt(0)?.toUpperCase() || 'F'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Olá, {user?.name || 'Viajante'}!
              </h1>
              <p className="text-muted-foreground font-medium">Pronto para a próxima aventura?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-card dark:bg-slate-800 rounded-[32px] p-6 shadow-md border-2 border-border/50 dark:border-slate-700 relative overflow-hidden transition-colors duration-200">
                <Suitcase className="absolute -bottom-4 -right-4 w-24 h-24 text-accent opacity-10" />

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-foreground">
                    <Settings className="w-5 h-5 text-muted-foreground" /> Seus Dados
                  </h2>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                      <Edit3 className="w-4 h-4" /> Editar
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase">Nome</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full mt-1 p-2 rounded-xl border-2 border-border bg-background focus:border-primary outline-none text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full mt-1 p-2 rounded-xl border-2 border-border bg-background focus:border-primary outline-none text-foreground"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="flex-1 rounded-xl">Cancelar</Button>
                      <Button type="submit" disabled={isSaving} className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Nome</p>
                      <p className="font-medium text-foreground">{user?.name || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Email</p>
                      <p className="font-medium text-foreground">{user?.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Guides */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-foreground">Seus Livros de Viagem</h2>
                <Button asChild className="rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-md">
                  <a href="/create">Novo Guia</a>
                </Button>
              </div>

              {loading ? (
                <div className="bg-card dark:bg-slate-800 rounded-[32px] p-12 shadow-sm border border-border/50 flex flex-col items-center justify-center space-y-4 transition-colors duration-200">
                  <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
                  <p className="text-muted-foreground font-medium">Buscando suas histórias...</p>
                </div>
              ) : guides.length === 0 ? (
                <div className="bg-card dark:bg-slate-800 rounded-[32px] p-12 shadow-sm border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 transition-colors duration-200">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-2">
                    <BookOpen className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-foreground">O livro está em branco!</h3>
                  <p className="text-muted-foreground font-medium max-w-sm">Você ainda não criou nenhum guia de viagem. Que tal começar a planejar a próxima aventura?</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guides.map((guide) => (
                    <div key={guide.id} className="group bg-card dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-border/50 dark:border-slate-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-sm font-bold text-primary tracking-wider uppercase">Viagem em Família</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{guide.title}</h3>
                        {guide.countries && (
                          <p className="text-muted-foreground font-medium mb-4 line-clamp-2">
                            Destinos: {JSON.parse(guide.countries).map(c => c.name).join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          {new Date(guide.created).toLocaleDateString('pt-BR')}
                        </span>
                        <Button variant="ghost" size="sm" className="font-bold text-secondary hover:bg-secondary/10 hover:text-secondary rounded-full">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
