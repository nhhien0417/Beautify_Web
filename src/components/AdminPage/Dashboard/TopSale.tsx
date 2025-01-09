import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import InventoryDetail from "../../../entities/InventoryDetail";

interface Props {
  topSale: InventoryDetail[];
}

const baseURL = "http://localhost:8080";

const TopProductSales = ({ topSale }: Props) => {
  return (
    <Card sx={{ borderRadius: 4, borderWidth: 2, height: "360px" }}>
      <CardContent>
        <Typography textAlign="center" variant="h6" fontWeight={600}>
          Top Product Sales
        </Typography>
        <List>
          {topSale.map((product, index) => (
            <ListItem key={index}>
              <ListItemAvatar sx={{ marginRight: "20px" }}>
                <Avatar
                  src={baseURL + product.product.productImage}
                  sx={{ width: "60px", height: "60px" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.product.name}
                secondary={`${product.totalSold} sold - $${product.product.unitPrice}/item`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopProductSales;
