# Hypercoop

Proof of concept of decentralized Marketplaces for an alternative economy.

## Next

- [ ] Update product action.
- [ ] Create a monorepo structure: split consumer and producers application.
- [ ] Work on catalog protocol specification.
- [ ] Test product creation component.
- [ ] Add uuid to products.
- [ ] Registration workflow between producers and conumers.

## Timeline

### 26/02/2021

P2P connections using (https://github.com/hyperswarm/hyperswarm). Now consumer nodes can also exchange
information

![P2P](/doc/img/hypercoop-20210226.png)

Other changes:
- [x] Refactoring: split HTTP API from hypercore.
- [x] Refactoring: use HTTP framework.

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