// src/pages/AdminUserPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import adminApi from '../api/adminApi';  // adminApi로 변경

const Container = styled.div`padding: 2rem;`;
const Title = styled.h1`margin-bottom: 1rem;`;
const Table = styled.table`width:100%;border-collapse:collapse;`;
const Th = styled.th`text-align:left;padding:.5rem;border-bottom:1px solid #ccc;`;
const Td = styled.td`padding:.5rem;border-bottom:1px solid #eee;`;
const Select = styled.select`padding:.25rem;`;
const Button = styled.button`margin-right:.5rem;`;

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [roleForm, setRoleForm] = useState('USER');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await adminApi.getUsers();
            setUsers(res.data);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (u) => {
        setEditId(u.id);
        setRoleForm(u.role);
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const saveEdit = async () => {
        if (!roleForm) return;
        setLoading(true);
        try {
            await adminApi.updateUserRole(editId, roleForm);
            setEditId(null);
            await fetchUsers();
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await adminApi.deleteUser(id);
            await fetchUsers();
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Container>로딩 중...</Container>;
    }

    return (
        <Container>
            <Title>Admin — 유저 관리 (Role 변경 전용)</Title>
            <Table>
                <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Nickname</Th>
                    <Th>Role</Th>
                    <Th>Actions</Th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <Td>{u.id}</Td>
                        <Td>{u.email}</Td>
                        <Td>{u.username}</Td>
                        <Td>{u.nickname || '-'}</Td>
                        <Td>
                            {editId === u.id ? (
                                <Select
                                    value={roleForm}
                                    onChange={e => setRoleForm(e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="TEACHER">TEACHER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Select>
                            ) : (
                                u.role
                            )}
                        </Td>
                        <Td>
                            {editId === u.id ? (
                                <>
                                    <Button onClick={saveEdit}>저장</Button>
                                    <Button onClick={cancelEdit}>취소</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => startEdit(u)}>Role 변경</Button>
                                    <Button onClick={() => deleteUser(u.id)}>삭제</Button>
                                </>
                            )}
                        </Td>
                    </tr>
                ))}
                {users.length === 0 && (
                    <tr>
                        <Td colSpan="6" style={{ textAlign: 'center' }}>
                            등록된 유저가 없습니다.
                        </Td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
}
