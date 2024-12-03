import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getPostsFirebase } from "../../servicos/PostsService";
import { getTasksFirebase } from "../../servicos/TasksService"; // Nova importação

function Home() {
  const [listaPosts, setListaPosts] = useState([]);
  const [listaTasks, setListaTasks] = useState([]);

  useEffect(() => {
    // Busca de Posts
    getPostsFirebase(setListaPosts);
    // Busca de Tasks
    getTasksFirebase(setListaTasks);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="div">
        Firebase com Firestore - Posts e Tasks - PWA
      </Typography>

      {/* Seção de Posts */}
      <Typography variant="h6" component="div" style={{ marginTop: "20px" }}>
        Posts
      </Typography>
      {listaPosts.length === 0 && (
        <Typography variant="h5" component="div">
          Nenhum Post encontrado
        </Typography>
      )}

      <Grid container spacing={2}>
        {listaPosts.map((post) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={post.id}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {post.tipo}
                </Typography>
                <Typography variant="h5" component="div">
                  {post.titulo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {post.texto}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <Link href={post.url} target="_blank" rel="noreferrer">
                    Link
                  </Link>
                </Typography>
                <Typography variant="h7" component="div">
                  {post.usuario}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {post.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Seção de Tasks */}
      <Typography variant="h6" component="div" style={{ marginTop: "20px" }}>
        Tasks
      </Typography>
      {listaTasks.length === 0 && (
        <Typography variant="h5" component="div">
          Nenhuma Task encontrada
        </Typography>
      )}

      <Grid container spacing={2}>
        {listaTasks.map((task) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={task.id}>
            <Card sx={{ minWidth: 50 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {task.titulo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {task.texto}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Prazo: {task.prazo}
                </Typography>
                <Typography variant="h7" component="div">
                  {task.usuario}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
