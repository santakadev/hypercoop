# Hypercoop

Proof of concept of decentralized Marketplaces for an alternative economy.

## Next

- [x] Use [hyperswarm](https://github.com/hyperswarm/hyperswarm) to make fully ditributted.
- [x] Refactoring: split HTTP API from hypercore.
- [x] Refactoring: use HTTP framework.
- [ ] Create a monorepo structure: split consumer and producers application.
- [ ] Work on catalog protocol specification.
- [ ] Test product creation component.
- [ ] Add uuid to products.
- [ ] Registration workflow between producers and conumers.

## Timeline


### 26/02/2021


#### Limitations

- HTTP API connects directly to hypercore DB.

### 25/02/2021

Producers can register and trasmit products to consumer nodes.

![Product creation](/doc/img/hypercoop-20210225.png)

#### Limitations

- Products doen't have an id.
- Product's prices doen't have currency.
- Products can't be updated.
- Producers work as servers, no truly P2P.
- Each time the `products` database is created we have to copy the public key to the client code.
- No validation.
- No automatic test.
- No API routing.
- Hardcoded paths for TS compilation.
- No real TS features usage.