package com.backend.controller;

import com.backend.dto.AdminUserDto;
import com.backend.dto.RoleUpdateDto;
import com.backend.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @GetMapping
    public List<AdminUserDto> list() {
        return adminUserService.findAll();
    }

    @GetMapping("/{id}")
    public AdminUserDto getOne(@PathVariable Long id) {
        return adminUserService.findById(id);
    }

    @PutMapping("/{id}/role")
    public AdminUserDto updateRole(
            @PathVariable Long id,
            @RequestBody RoleUpdateDto dto
    ) {
        return adminUserService.updateRole(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminUserService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
