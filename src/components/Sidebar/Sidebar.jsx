import React from "react";
import {
  withStyles,
  SwipeableDrawer,
  IconButton,
  Divider,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./styles";
import UserDetails from "./UserDetails";
import routes from "../Dashboard/routes";

const Sidebar = ({ open, classes, toggleDrawer, swipeable, identity, location: { pathname } }) => {
  const pathnameNoSlash = pathname.substring(1);
  return (
    <SwipeableDrawer
      anchor="left"
      disableSwipeToOpen={!swipeable}
      disableDiscovery={!swipeable}
      disableBackdropTransition={!swipeable}
      ModalProps={{
        disablePortal: true
      }}
      variant={swipeable ? "temporary" : "persistent"}
      open={open}
      onOpen={() => toggleDrawer(true)}
      onClose={() => toggleDrawer(false)}
      className={classes.drawer}
      classes={{
        paper: classNames(classes.drawerPaper, classes.background)
      }}
    >
      <div className={classes.logo}>
        <Typography>ARG STRANDING</Typography>
        <IconButton className={classes.end} onClick={() => toggleDrawer(false)}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </div>
      <Divider
        classes={{
          root: classes.dividerRoot
        }}
        variant="middle"
      />
      <Scrollbars style={{ height: "calc(100% + 1px)" }}>
        <div className={classes.sidebarMenu}>
          <List>
            {routes.map(({ page, text }) => (
              <ListItem
                key={page}
                draggable={false}
                className={classes.menuButton}
                button
                component={Link}
                to={page}
                selected={page === pathnameNoSlash}
              >
                <Typography variant="button">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Scrollbars>
      <Divider
        classes={{
          root: classes.dividerRoot
        }}
        variant="middle"
      />
      <UserDetails identity={identity} />
    </SwipeableDrawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  open: PropTypes.bool.isRequired,
  swipeable: PropTypes.bool.isRequired,
  identity: PropTypes.shape({
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string
  }).isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(Sidebar));
