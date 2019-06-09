import React from "react";
import { Paper, createStyles, Theme, withStyles, Grid } from "@material-ui/core";
import { WithStyles } from "@material-ui/styles";
import { Item } from "../State";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  });

interface CommandProps extends WithStyles<typeof styles> {
  item: Item;
}

const Command: React.SFC<CommandProps> = ({ item, classes: { root } }) => {
  return (
    <Paper className={root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img
            alt={item.filename}
            src={item.url}
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={8}>
          {item.command[0]}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Command);
