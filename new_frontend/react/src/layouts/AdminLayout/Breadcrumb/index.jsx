import React, { useState, useEffect } from 'react';

// react-bootstrap
import { ListGroup, Row, Col, Button, Dropdown } from 'react-bootstrap';

// third party
import { Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

// project imports
import navigation from 'menu-items';
import { BASE_TITLE } from 'config/constant';

// -----------------------|| BREADCRUMB ||-----------------------//

export default function Breadcrumb() {
  const [main, setMain] = useState({});
  const [item, setItem] = useState({});
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-ignore
  const location = useLocation();

  useEffect(() => {
    navigation.items.map((item) => {
      if (item.type && item.type === 'group') {
        getCollapse(item);
      }
      return false;
    });
  });

  const getCollapse = (items) => {
    if (items.children) {
      items.children.filter((collapse) => {
        if (collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (document.location.pathname === import.meta.env.VITE_APP_BASE_NAME + collapse.url) {
            setMain(items);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  let mainContent;
  let itemContent;
  let breadcrumbContent;
  let title = '';
  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title}</Link>
      </ListGroup.Item>
    );

    if (item.breadcrumbs !== false) {
     
    }

    document.title = title + BASE_TITLE;
  }

  return <>{breadcrumbContent}</>;
}
