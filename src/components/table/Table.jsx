import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
   const rows = [
      {
         id: 1143155,
         product: "Acer Nitro 5",
         img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
         customer: "Arya Stark",
         date: "21 July",
         amount: 2,
         method: "Cash on Delivery",
         status: "Approved",
      },
      {
         id: 2235235,
         product: "Playstation 5",
         img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
         customer: "Tyrion Lannister",
         date: "21 July",
         amount: 3,
         method: "Online Payment",
         status: "Pending",
      },
      {
         id: 2342353,
         product: "Redragon S101",
         img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
         customer: "Ramsay Bolton",
         date: "21 July",
         amount: 1,
         method: "Cash on Delivery",
         status: "Pending",
      },
      {
         id: 2357741,
         product: "Razer Blade 15",
         img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
         customer: "Cersei Lannister   ",
         date: "20 July",
         amount: 1,
         method: "Online",
         status: "Approved",
      },
      {
         id: 2342355,
         product: "ASUS ROG Strix",
         img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
         customer: "Jon Snow",
         date: "19 July",
         amount: 3,
         method: "Online",
         status: "Pending",
      },
   ];

   return (
      <TableContainer component={Paper} className="table">
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell className="table__cell">Tracking ID</TableCell>
                  <TableCell className="table__cell">Product</TableCell>
                  <TableCell className="table__cell">Customer</TableCell>
                  <TableCell className="table__cell">Date</TableCell>
                  <TableCell className="table__cell">Amount</TableCell>
                  <TableCell className="table__cell">Payment Method</TableCell>
                  <TableCell className="table__cell">Status</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => (
                  <TableRow key={row.id}>
                     <TableCell className="table__cell">{row.id}</TableCell>
                     <TableCell className="table__cell">
                        <div className="cell__wrapper">
                           <img src={row.img} alt="" className="image" />
                           {row.product}
                        </div>
                     </TableCell>
                     <TableCell className="table__cell">
                        {row.customer}
                     </TableCell>
                     <TableCell className="table__cell">{row.date}</TableCell>
                     <TableCell className="table__cell">{row.amount}</TableCell>
                     <TableCell className="table__cell">{row.method}</TableCell>
                     <TableCell className="table__cell">
                        <span className={`status ${row.status}`}>
                           {row.status}
                        </span>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default List;
