"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Plus } from "lucide-react";

type Post = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
};

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: "Ana Paula",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Acabei de receber meu kit essencial e estou APAIXONADA! A qualidade é incrível e a entrega super discreta. Recomendo demais! 💜",
    likes: 42,
    comments: 8,
    timestamp: "2h atrás",
    liked: false,
  },
  {
    id: 2,
    author: "Juliana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Alguém mais testou o óleo de lavanda? Estou pensando em comprar mas queria saber mais opiniões antes 🤔",
    likes: 28,
    comments: 15,
    timestamp: "5h atrás",
    liked: true,
  },
  {
    id: 3,
    author: "Mariana Silva",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    content: "Gente, o atendimento da Selena é SENSACIONAL! Ela me ajudou a escolher produtos perfeitos para mim. Experiência 10/10! ✨",
    likes: 67,
    comments: 12,
    timestamp: "1 dia atrás",
    liked: false,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: "Você",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: "Agora",
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Comunidade Venus</h1>
          <p className="text-muted-foreground">
            Conecte-se, compartilhe experiências e inspire outras pessoas
          </p>
        </div>

        {/* Create Post Button */}
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="w-full mb-6 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all flex items-center justify-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Criar Novo Post
        </button>

        {/* Create Post Form */}
        {showCreatePost && (
          <div className="mb-6 bg-card border border-border rounded-2xl p-6">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Compartilhe sua experiência, dúvida ou dica..."
              className="w-full h-32 px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-6 py-2 gradient-venus text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publicar
              </button>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.timestamp}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Compartilhar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
