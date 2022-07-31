import { useNavigate } from "react-router-dom";
import "./style.css";
import { Paper, Divider, MenuList, MenuItem, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Paper className="stylepop">
      <MenuList>
        <MenuItem>
          <div
            onClick={() => {
              navigate("/DashboardAdmin");
            }}
            className="stylediv"
          >
            <div>
              <DashboardOutlinedIcon sx={{ color: "#F51534" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Tableau de Board</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listcategories");
            }}
            className="stylediv"
          >
            <div>
              <AspectRatioOutlinedIcon sx={{ color: "#1C15F5" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Catégories</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listscategories");
            }}
            className="stylediv"
          >
            <div>
              <ArticleOutlinedIcon sx={{ color: "#316610" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>SousCatégories</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listarticles");
            }}
            className="stylediv"
          >
            <div>
              <ReceiptLongOutlinedIcon sx={{ color: "#991793" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Produits</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/ListOrders");
            }}
            className="stylediv"
          >
            <div>
              <AssignmentOutlinedIcon sx={{ color: "#FFC300" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Commandes</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />
      </MenuList>
    </Paper>
  );
};

export default AdminSidebar;
