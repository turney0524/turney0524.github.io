"""Finite, spinless SSH chain with open boundaries. Requires NumPy."""
import numpy as np


def ssh_hamiltonian(cells=24, t1=0.6, t2=1.0):
    if not isinstance(cells, int) or cells < 1:
        raise ValueError('cells must be a positive integer')
    H = np.zeros((2 * cells, 2 * cells), dtype=float)
    for j in range(cells):
        a, b = 2 * j, 2 * j + 1
        H[a, b] = H[b, a] = t1
        if j + 1 < cells:
            H[b, a + 2] = H[a + 2, b] = t2
    return H


def main():
    H = ssh_hamiltonian()
    energies, states = np.linalg.eigh(H)
    assert np.allclose(H, H.conj().T)
    assert np.allclose(states.conj().T @ states, np.eye(H.shape[0]))
    assert np.linalg.norm(H @ states - states * energies) < 1e-10
    print('Energy           Edge weight       Residual')
    for i in np.argsort(np.abs(energies))[:2]:
        psi = states[:, i]
        edge_weight = np.sum(np.abs(psi[[0, 1, -2, -1]]) ** 2)
        residual = np.linalg.norm(H @ psi - energies[i] * psi)
        print(f'{energies[i]:+.8e}  {edge_weight:.8f}        {residual:.2e}')


if __name__ == '__main__':
    main()
