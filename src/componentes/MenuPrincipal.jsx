import { NavLink, Outlet } from "react-router-dom";
import LogoIfsul from "../imagens/logo512.png";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { logout, auth, signInWithGoogle } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import {
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
} from "firebase/auth";
function MenuPrincipal() {
  const [user, loading, error] = useAuthState(auth);
  const [anchorElMenuManutencoes, setAnchorElMenuManutencoes] = useState(null);

  const handleOpenMenuManutencoes = (event) => {
    setAnchorElMenuManutencoes(event.currentTarget);
  };

  const handleCloseMenuManutencoes = () => {
    setAnchorElMenuManutencoes(null);
  };

  const handleCloseNavMenuManutencoes = () => {
    setAnchorElNav(null);
    setAnchorElMenuManutencoes(null);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    signInWithGoogle();
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logout();
    setAnchorElUser(null);
  };

  const handleLoginWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário autenticado com GitHub:", result.user);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        const email = error.customData.email;

        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.includes("google.com")) {
            const googleProvider = new GoogleAuthProvider();
            const googleResult = await signInWithPopup(auth, googleProvider);

            await linkWithCredential(googleResult.user, pendingCred);
            alert("Conta do GitHub vinculada com sucesso!");
          } else {
            alert("O email já está associado a outro método de login.");
          }
        } catch (linkError) {
          console.error("Erro ao vincular conta:", linkError);
        }
      } else {
        console.error("Erro ao autenticar com GitHub:", error);
      }
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Inicio tela grande - Logo Home */}
            <Avatar
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              alt="Logo IFSUL"
              src={LogoIfsul}
            />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Meus Posts
            </Typography>

            {/* Inicio itens menu tela pequena */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Box sx={{ flexGrow: 0 }}>
                  {user && (
                    <>
                      <MenuItem onClick={handleOpenMenuManutencoes}>
                        <Typography textAlign="center">Manutenções</Typography>
                      </MenuItem>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-manutencoes"
                        anchorEl={anchorElMenuManutencoes}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={anchorElMenuManutencoes}
                        onClose={handleCloseMenuManutencoes}
                      >
                        <MenuItem
                          onClick={handleCloseNavMenuManutencoes}
                          component={NavLink}
                          to="posts"
                        >
                          <Typography textAlign="center">Posts</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseNavMenuManutencoes}
                          component={NavLink}
                          to="tasks"
                        >
                          <Typography textAlign="center">Tasks</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={NavLink}
                    to="sobre"
                  >
                    <Typography textAlign="center">Sobre...</Typography>
                  </MenuItem>
                </Box>
              </Menu>
            </Box>

            {/* Inicio itens menu tela grande */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box sx={{ flexGrow: 0 }}>
                {user && (
                  <>
                    <Button
                      onClick={handleOpenMenuManutencoes}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textTransform: "unset !important",
                      }}
                    >
                      Manutenções
                    </Button>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-manutencoes"
                      anchorEl={anchorElMenuManutencoes}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={anchorElMenuManutencoes}
                      onClose={handleCloseMenuManutencoes}
                    >
                      <MenuItem
                        onClick={handleCloseMenuManutencoes}
                        component={NavLink}
                        to="posts"
                      >
                        <Typography textAlign="center">Posts</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseMenuManutencoes}
                        component={NavLink}
                        to="tasks"
                      >
                        <Typography textAlign="center">Tasks</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Box>

            {/* Itens da direita */}
            <Button
              component={NavLink}
              to="sobre"
              sx={{
                my: 1,
                color: "white",
                display: { xs: "none", md: "flex" },
                textTransform: "unset !important",
              }}
            >
              Sobre
            </Button>
            {/* Itens da direita */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title="Voltar para Home">
                <Button
                  component={NavLink}
                  to="/"
                  sx={{
                    my: 1,
                    color: "white",
                    display: "flex", // Certifica-se de que o botão é exibido
                    textTransform: "unset !important",
                  }}
                >
                  Voltar
                </Button>
              </Tooltip>
              <Tooltip title="Menu do usuário">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  <Typography>
                    {!user ? "Autenticar" : <> {user?.displayName} </>}
                  </Typography>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user && (
                  <MenuItem onClick={handleLogOut} component={NavLink} to="/">
                    <Typography textAlign="center">Efetuar Logout</Typography>
                  </MenuItem>
                )}
                {!user && (
                  <>
                    <MenuItem onClick={signInWithGoogle}>
                      <Typography textAlign="center">
                        Login com Google
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLoginWithGitHub}>
                      <Typography textAlign="center">
                        Login com GitHub
                      </Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default MenuPrincipal;
