// Node Modules
import React from "react";
import PropTypes from "prop-types";

// Style
import "./styles.scss";

const ProductDetail = ({ product }) => (
  <div className="container-fluid">
    <div style={{ height: "25rem", width: "100%" }}>
      <div className="row">
        <div className="col-6 product-image">
          <img src={product.fullImage} />
        </div>
        <div className="col-6 product-data">
          <h1>{product.name}</h1>
          <h2>{product.partNumber}</h2>
          <div className="row">
            <div className="col-6">
              <p>Normal</p>
            </div>
            <div className="col-6">
              {product.prices !== undefined
                ? product.prices.formattedListPrice
                : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Internet</p>
            </div>
            <div className="col-6">
              {" "}
              {product.prices !== undefined
                ? product.prices.formattedOfferPrice
                : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Descuento</p>
            </div>
            <div className="col-6">
              {product.prices !== undefined
                ? product.prices.formattedDiscount
                : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Acumulas</p>
            </div>
            <div className="col-6">
              {" "}
              {product.prices !== undefined
                ? product.prices.ripleyPuntos
                : 0}{" "}
              puntos ripley
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <div style={{ marginTop: "10px" }}>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Descripción
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">{product.longDescription}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Especificaciones
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  {product.attributes !== undefined &&
                    product.attributes.map(ele => (
                      <tr key={ele.name}>
                        <th>{ele.name}</th>
                        <td className="text-right">{ele.value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Garantía Legal y Devoluciones
              </button>
            </h2>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              La Garantía legal establece la cobertura dentro de los 3 primeros
              meses de adquirido el producto ante fallas, defectos de
              fabricación, no tuviera las características o no corresponda a lo
              informado al momento de la compra. En Ripley.com puedes
              retractarte de tu compra en los 10 días contados desde su
              recepción. Ver más sobre derecho a retracto. La Garantía del
              Fabricante hace referencia a un compromiso de cobertura adicional
              que podría superar la garantía legal de los 3 primeros meses.
              Posteriormente, el fabricante es quien será responsable de
              recepcionar y velar por la garantía dependiendo de las vigencia y
              las condiciones ofrecidas y establecidas en cada caso. Ver más
              sobre garantía legal.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProductDetail.propTypes = {
  product: PropTypes.object
};

export default ProductDetail;
